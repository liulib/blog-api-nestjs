import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import {
  Repository,
  getRepository,
  getManager,
  EntityManager,
  getConnection,
} from 'typeorm';

import { Article } from './article.entity';

import { ResponseData } from '@/common/interfaces/response.interface';
import { pageData } from '@/common/interfaces/pageData.interface';

import {
  CreateArticleDto,
  UpdateArticleDto,
  QueryArticleOptionDto,
  QueryArticleDetailDto,
} from './article.dto';

import { TagService } from '../tag/tag.service';
import { CategoryService } from '../category/category.service';
import { vLogService } from '@/modules/vLog/vLog.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    private readonly tagService: TagService,
    private readonly categoryService: CategoryService,
    private readonly v_logService: vLogService,
  ) {}

  /**
   * @description: 创建文章
   * @param {CreateArticleDto} data
   * @return {*}
   */
  async create(data: CreateArticleDto): Promise<ResponseData<null>> {
    try {
      const { tags = '', categoryId, ...others } = data;
      let tagIdList = [];
      // 遍历标签
      if (tags.replace(/(^\s*)|(\s*$)/g, '') !== '') {
        tagIdList = tags.split(',');
      }

      await getManager().transaction(async (entityManager: EntityManager) => {
        // 创建文章 这个效率低
        const article = this.articleRepository.create({
          ...others,
        });
        // 赋值标签
        if (tagIdList.length > 0) {
          article.tags = await this.tagService.findList(tagIdList);
        } else {
          article.tags = [];
        }
        // 赋值分类
        const category = await this.categoryService.findOneById(categoryId);
        if (!category) throw new NotFoundException('分类不存在');

        article.category = category;

        // 保存关联关系
        await entityManager.save(article);
      });
      return {
        code: 1,
        message: '创建成功',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @description: 更新文章
   * @param {UpdateArticleDto} data
   * @return {*}
   */
  async update(data: UpdateArticleDto): Promise<ResponseData<null>> {
    try {
      // 解构数据
      const { id, tags = '', categoryId, ...others } = data;
      let tagIdList = [];
      // 遍历标签
      if (tags.replace(/(^\s*)|(\s*$)/g, '') !== '')
        tagIdList = tags.split(',');
      // 开启事务处理数据库
      await getManager().transaction(async (entityManager: EntityManager) => {
        // 更新文章 这里不存在就不会有影响 所以不做结果验证了
        await getConnection()
          .createQueryBuilder()
          .update(Article)
          .set(others)
          .where('id = :id', {
            id: id,
          })
          .execute();

        // 查询文章是否存在
        const article = await getRepository(Article)
          .createQueryBuilder('article')
          .where('article.id = :id', {
            id: id,
          })
          .getOne();
        if (!article) throw new NotFoundException('文章不存在');
        // 赋值标签
        if (tagIdList.length > 0) {
          article.tags = await this.tagService.findList(tagIdList);
        } else {
          article.tags = [];
        }
        // 赋值分类
        const category = await this.categoryService.findOneById(categoryId);
        if (!category) throw new NotFoundException('分类不存在');
        article.category = category;
        await entityManager.save(article);
      });
      return { code: 1, message: '更新成功' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @description: 根据条件查询分页的文章列表
   * @param {QueryArticleOption} queryOption
   * @return {*}
   */
  async findListAndCount(
    queryOption: QueryArticleOptionDto,
  ): Promise<ResponseData<pageData<Article>>> {
    const { page, pageSize, tagId, categoryId, isDelete } = queryOption;

    const [number, size] = [Number(page), Number(pageSize)];

    const queryOptionList = [];
    if (isDelete) queryOptionList.push('article.isDelete = :isDelete');
    if (categoryId) queryOptionList.push('article.categoryId = :categoryId');
    const queryOptionStr = queryOptionList.join(' AND ');

    let res = null;

    if (tagId) {
      res = await getRepository(Article)
        .createQueryBuilder('article')
        .where(queryOptionStr, queryOption)
        .innerJoin('article.tags', 'tag', 'tag.id = :tagId', { tagId })
        .skip((number - 1) * size)
        .take(size)
        .getManyAndCount();
    } else {
      res = await getRepository(Article)
        .createQueryBuilder('article')
        .where(queryOptionStr, queryOption)
        .skip((number - 1) * size)
        .take(size)
        .getManyAndCount();
    }

    const [list, total] = res;

    return {
      code: 1,
      message: '查询成功',
      data: { list, total, page: number, pageSize: size },
    };
  }

  /**
   * @description: 根据ID查询文章详情
   * @param {*}
   * @return {*}
   */
  async findDetailById(
    id: QueryArticleDetailDto,
    req,
  ): Promise<ResponseData<Article>> {
    const article = await getRepository(Article)
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.tags', 'tags')
      .where('article.id = :id', id)
      .getOne();

    const updatedArticle = await this.articleRepository.merge(article, {
      viewCount: article.viewCount + 1,
    });
    await this.articleRepository.save(updatedArticle);

    // 记录访问信息
    this.v_logService.create(req);

    if (!article) return { code: 0, message: '查询失败，文章不存在' };
    return { code: 1, message: '查询成功', data: article };
  }
}
