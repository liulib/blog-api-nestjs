import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';

import { Comment } from './comment.entity';
import { ResponseData } from '@/common/interfaces/response.interface';
import { CreateCommentDto, QueryOptionDto } from './comment.dto';
import { pageData } from '@/common/interfaces/pageData.interface';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  /**
   * @description: 创建评论
   * @param {CreateCommentDto} data
   * @param {*} user
   * @return {*}
   */
  async create(data: CreateCommentDto, user): Promise<ResponseData<null>> {
    // 解构用户ID
    const { id: userId } = user;
    // 将用户ID合并到data中
    Object.assign(data, { userId });
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

  /**
   * @description: 分页获取当前文章的评论
   * @param {*}
   * @return {*}
   */
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
}
