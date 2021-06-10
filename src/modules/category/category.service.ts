import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';

import { Category } from './category.entity';

import { ResponseData } from '@/common/interfaces/response.interface';

import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  /**
   * @description: 创建分类
   * @param {CreateCategoryDto} data
   * @return {*}
   */
  async create(data: CreateCategoryDto): Promise<ResponseData<null>> {
    try {
      const { categoryName } = data;
      //查询是否存在
      const existCategory = await getRepository(Category)
        .createQueryBuilder('category')
        .where('category.categoryName = :categoryName', {
          categoryName: categoryName,
        })
        .getOne();
      if (existCategory) return { code: 0, message: '分类已存在' };

      // 创建分类
      await getRepository(Category)
        .createQueryBuilder('category')
        .insert()
        .into(Category)
        .values(data)
        .execute();

      return {
        code: 1,
        message: '创建成功',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @description: 更新分类
   * @param {UpdateCategoryDto} data
   * @return {*}
   */
  async update(data: UpdateCategoryDto): Promise<ResponseData<null>> {
    try {
      const res = await getRepository(Category)
        .createQueryBuilder('category')
        .update()
        .set(data)
        .where('category.id = :id', { id: data.id })
        .execute();

      if (res.affected === 1) {
        return { code: 1, message: '更新成功' };
      } else {
        return { code: 0, message: '更新失败' };
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @description: 获取所有分类
   * @param {*}
   * @return {*}
   */
  async findList(): Promise<ResponseData<Category[]>> {
    const categoryList = await getRepository(Category)
      .createQueryBuilder('category')
      .getMany();
    return {
      code: 1,
      message: '查询成功',
      data: categoryList,
    };
  }

  /**
   * @description: 根据id查询分类 用于给文章分配分类
   * @param {number} id
   * @return {*}
   */
  async findOneById(id: number): Promise<Category> {
    return await getRepository(Category)
      .createQueryBuilder('category')
      .where('category.id = :id', { id: id })
      .getOne();
  }
}
