import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, getManager, EntityManager } from 'typeorm';
import { Role } from './role.entity';
import {
  CreateRoleDto,
  UpdateRoleDto,
  QueryRoleDto,
  DeployMenuDto,
} from './role.dto';

import { MenuService } from '../menu/menu.service';
import { ResponseData } from '@/common/interfaces/response.interface';
import { pageData } from '@/common/interfaces/pageData.interface';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private readonly menuService: MenuService,
  ) {}

  /**
   * @description: 创建角色
   * @param {*} role
   * @return {*}
   */
  async create(cto: CreateRoleDto): Promise<ResponseData<null>> {
    try {
      // 判断角色是否存在
      const role = await getRepository(Role)
        .createQueryBuilder('role')
        .where('role.roleName = :roleName', { roleName: cto.roleName })
        .getOne();
      if (role) {
        throw new HttpException(`角色名已存在`, HttpStatus.OK);
      }
      // 创建角色
      await getRepository(Role)
        .createQueryBuilder('role')
        .insert()
        .into(Role)
        .values(cto)
        .execute();
      return { code: 1, message: '创建成功' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.OK);
    }
  }

  /**
   * @description: 更新角色
   * @param {UpdateRoleDto} uto
   * @return {*}
   */
  async update(uto: UpdateRoleDto): Promise<ResponseData<null>> {
    try {
      const res = await getRepository(Role)
        .createQueryBuilder('role')
        .update()
        .set(uto)
        .where('role.id = :id', { id: uto.id })
        .execute();
      if (res.affected === 1) {
        return { code: 1, message: '更新成功' };
      } else {
        return { code: 0, message: '更新失败' };
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.OK);
    }
  }
  /**
   * @description: 根据角色ID列表查询出角色列表 用于给用户分配角色
   * @param {*}
   * @return {*}
   */
  async findList(roleIdList: string[]): Promise<Role[]> {
    const queryOptionList = [];
    roleIdList.forEach(roleId => {
      queryOptionList.push(`role.id = ${roleId}`);
    });
    const queryOptionStr = queryOptionList.join(' OR ');
    return await getRepository(Role)
      .createQueryBuilder('role')
      .where(queryOptionStr)
      .getMany();
  }

  /**
   * @description: 根据id查找角色
   * @param {*}
   * @return {*}
   */
  async findOneById(id: number): Promise<Role> {
    const entity = await getRepository(Role)
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.menus', 'menu')
      .where('role.id = :id', { id: id })
      .getOne();

    if (!entity) throw new NotFoundException('角色不存在');

    return entity;
  }

  /**
   * @description: 分页的角色列表
   * @param {*}
   * @return {*}
   */
  async findListAndCount(
    queryOption: QueryRoleDto,
  ): Promise<ResponseData<pageData<Role>>> {
    try {
      const {
        page = 1,
        pageSize = 10,
        roleName,
        isDelete,
        created,
        updated,
      } = queryOption;

      const [number, size] = [Number(page), Number(pageSize)];

      const queryOptionList = [];
      if (roleName) queryOptionList.push('role.roleName LIKE :roleName');
      if (isDelete) queryOptionList.push('role.isDelete = :isDelete');
      if (created) queryOptionList.push('role.created = :created');
      if (updated) queryOptionList.push('role.updated = :updated');
      const queryOptionStr = queryOptionList.join(' AND ');

      const [list, total] = await getRepository(Role)
        .createQueryBuilder('role')
        .leftJoinAndSelect('role.menus', 'menu')
        .where(queryOptionStr, queryOption)
        .skip((number - 1) * size)
        .take(size)
        .getManyAndCount();

      return {
        code: 1,
        message: '查询成功',
        data: { list, total, page: number, pageSize: size },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.OK);
    }
  }

  /**
   * @description: 给角色赋权
   * @param {*}
   * @return {*}
   */
  async deployMenu(deployMenuDto: DeployMenuDto): Promise<ResponseData<null>> {
    const { id, menus } = deployMenuDto;
    let menuIdList = [];

    // 查找角色
    const role = await this.findOneById(id);

    // 判断角色是否存在
    if (!role) throw new NotFoundException('角色不存在');

    // 遍历菜单权限
    if (menus && menus.replace(/(^\s*)|(\s*$)/g, '') !== '') {
      menuIdList = menus.split(',');
    }

    await getManager().transaction(async (entityManager: EntityManager) => {
      // 赋值权限
      if (menuIdList.length > 0) {
        role.menus = await this.menuService.findList(menuIdList);
      } else {
        role.menus = [];
      }
      await entityManager.save(role);
    });
    return { code: 1, message: '分配权限成功' };
  }

  /**
   * @description: 查询全部角色
   */
  async findAll(): Promise<ResponseData<Role[]>> {
    const roleList = await getRepository(Role)
      .createQueryBuilder('role')
      .getMany();
    return {
      code: 1,
      message: '查询成功',
      data: roleList,
    };
  }
}
