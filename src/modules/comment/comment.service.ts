import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';

import { Comment } from './comment.entity';
import { ResponseData } from '@/common/interfaces/response.interface';
import { CreateCommentDto, QueryOptionDto, QueryAllDto } from './comment.dto';
import { pageData } from '@/common/interfaces/pageData.interface';

import { UserService } from '../user/user.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private readonly userService: UserService,
  ) {}

  // 创建评论
  async create(data: CreateCommentDto, user): Promise<ResponseData<null>> {
    // 解构用户ID
    const { id: userId, username } = user;
    // 将用户ID合并到data中
    Object.assign(data, { commentUserId: userId, commentUsername: username });
    // 创建评论
    await getRepository(Comment)
      .createQueryBuilder('comment')
      .insert()
      .into(Comment)
      .values(data)
      .execute();
    return {
      code: 1,
      message: '评论成功',
    };
  }

  // 分页获取当前文章的评论
  async findListByArticleId(
    queryOption: QueryOptionDto,
  ): Promise<ResponseData<pageData<Comment>>> {
    const { page, pageSize, articleId } = queryOption;
    const [number, size] = [Number(page), Number(pageSize)];

    // 获取顶级评论
    const [list, total] = await getRepository(Comment)
      .createQueryBuilder('comment')
      .where('comment.articleId = :articleId', { articleId })
      .andWhere('comment.replyId = 0')
      .orderBy('comment.createdAt', 'DESC')
      .skip((number - 1) * size)
      .take(size)
      .getManyAndCount();

    // 递归查询子级评论
    const subQuery = getRepository(Comment)
      .createQueryBuilder('comment')
      .where('comment.articleId = :articleId', { articleId })
      .andWhere('comment.replyId = :replyId')
      .orderBy('comment.createdAt', 'DESC');

    // 递归函数
    const recursionSubQuery = async list => {
      for (const item of list) {
        const subComments = await subQuery
          .setParameter('replyId', item.id)
          .getMany();
        Object.assign(item, {
          children: subComments,
        });
        if (subComments.length > 0) await recursionSubQuery(subComments);
      }
    };
    // 递归
    await recursionSubQuery(list);

    return {
      code: 1,
      message: '查询成功',
      data: {
        list,
        total,
        page: number,
        pageSize: size,
      },
    };
  }

  // 获取当前文章的评论不分页
  async findAllByArticleId(
    queryOption: QueryAllDto,
  ): Promise<ResponseData<Comment[]>> {
    const { articleId } = queryOption;

    // 获取顶级评论
    const list = await getRepository(Comment)
      .createQueryBuilder('comment')
      .where('comment.articleId = :articleId', { articleId })
      .andWhere('comment.replyId = 0')
      .orderBy('comment.createdAt', 'DESC')
      .getMany();

    // 获取相关用户信息
    for (let i = 0; i < list.length; i++) {
      list[i]['commentUser'] = await this.userService.finUserInfoById(
        list[i].commentUserId,
      );
    }

    // 递归查询子级评论
    const subQuery = getRepository(Comment)
      .createQueryBuilder('comment')
      .where('comment.articleId = :articleId', { articleId })
      .andWhere('comment.replyId = :replyId')
      .orderBy('comment.createdAt');

    // 递归函数
    const recursionSubQuery = async list => {
      for (const item of list) {
        const subComments = await subQuery
          .setParameter('replyId', item.id)
          .getMany();

        // 获取相关用户信息
        for (let i = 0; i < subComments.length; i++) {
          subComments[i][
            'commentUser'
          ] = await this.userService.finUserInfoById(
            subComments[i].commentUserId,
          );
          subComments[i]['replyUser'] = await this.userService.finUserInfoById(
            subComments[i].replyUserId,
          );
        }

        Object.assign(item, {
          children: subComments,
        });
        if (subComments.length > 0) await recursionSubQuery(subComments);
      }
    };
    // 递归
    await recursionSubQuery(list);

    return {
      code: 1,
      message: '查询成功',
      data: list,
    };
  }

  // 根据文章ID获取评论数，用于给首页接口提供评论数量。 PS:只统计顶级评论
  async countTotalByArticleId(articleId: number): Promise<number> {
    // 获取顶级评论
    return await getRepository(Comment)
      .createQueryBuilder('comment')
      .where('comment.articleId = :articleId', { articleId })
      .andWhere('comment.replyId = 0')
      .getCount();
  }
}
