import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';

import { Tag } from './tag.entity';
import { ResponseData } from '@/common/interfaces/response.interface';

import { CreateTagDto, UpdateTagDto } from './tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  // 创建标签
  async create(data: CreateTagDto): Promise<ResponseData<null>> {
    const { tagName } = data;
    //查询是否存在
    const existTag = await getRepository(Tag)
      .createQueryBuilder('tag')
      .where('tag.tagName = :tagName', {
        tagName: tagName,
      })
      .getOne();
    if (existTag) return { code: 0, message: '标签已存在' };

    // 创建标签
    await getRepository(Tag)
      .createQueryBuilder('tag')
      .insert()
      .into(Tag)
      .values(data)
      .execute();

    return {
      code: 1,
      message: '创建成功',
    };
  }

  // 更新标签
  async update(data: UpdateTagDto): Promise<ResponseData<null>> {
    const res = await getRepository(Tag)
      .createQueryBuilder('tag')
      .update()
      .set(data)
      .where('tag.id = :id', { id: data.id })
      .execute();

    if (res.affected === 1) {
      return { code: 1, message: '更新成功' };
    } else {
      return { code: 0, message: '更新失败' };
    }
  }

  // 获取所有标签
  async findAll(): Promise<ResponseData<Tag[]>> {
    const tagList = await getRepository(Tag)
      .createQueryBuilder('tag')
      .getMany();
    return {
      code: 1,
      message: '查询成功',
      data: tagList,
    };
  }

  // 根据标签ID列表查询出标签列表 用于给文章分配标签
  async findList(tagIdList: string[]): Promise<Tag[]> {
    const queryOptionList = [];

    tagIdList.forEach(tagId => {
      queryOptionList.push(`tag.id = ${tagId}`);
    });

    const queryOptionStr = queryOptionList.join(' OR ');

    return await getRepository(Tag)
      .createQueryBuilder('tag')
      .where(queryOptionStr)
      .getMany();
  }
}
