import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Menu } from './menu.entity';
import { CreateMenuDto } from './menu.dto';

import { ResponseData } from '../../common/interfaces/response.interface';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  // 创建菜单
  async create(cto: CreateMenuDto): Promise<ResponseData<null>> {
    // 判断菜单是否存在
    const menu = await getRepository(Menu)
      .createQueryBuilder('menu')
      .where('menu.menuName = :menuName', {
        menuName: cto.menuName,
      })
      .getOne();
    if (menu) {
      return {
        code: 0,
        message: '菜单名已存在',
      };
    }
    // 创建菜单
    await getRepository(Menu)
      .createQueryBuilder('menu')
      .insert()
      .into(Menu)
      .values(cto)
      .execute();
    return {
      code: 1,
      message: '创建成功',
    };
  }

  // 更新菜单
  async updateById(uto): Promise<ResponseData<null>> {
    const res = await getRepository(Menu)
      .createQueryBuilder('menu')
      .update()
      .set(uto)
      .where('menu.id = :id', { id: uto.id })
      .execute();
    if (res.affected === 1) {
      return { code: 1, message: '更新成功' };
    } else {
      return { code: 0, message: '更新失败' };
    }
  }

  // 根据id列表查找菜单列表 用于给角色分配权限
  async findList(menuIdList: string[]): Promise<Menu[]> {
    const queryOptionList = [];
    menuIdList.forEach(menuId => {
      queryOptionList.push(`menu.id = ${menuId}`);
    });
    const queryOptionStr = queryOptionList.join(' OR ');
    return await getRepository(Menu)
      .createQueryBuilder('menu')
      .where(queryOptionStr)
      .getMany();
  }

  // 查询所有菜单不分页
  async findAll(): Promise<ResponseData<Menu[]>> {
    const data = await getRepository(Menu)
      .createQueryBuilder('menu')
      .getMany();
    return { code: 1, message: '查询成功', data: data };
  }
}
