import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, getManager, EntityManager } from 'typeorm';
import { User } from './user.entity';
import {
  CreateUserDto,
  DeployRoleDto,
  QueryUserDto,
  changePwdDto,
} from './user.dto';

import { RoleService } from '../role/role.service';

import { ResponseData } from '../../common/interfaces/response.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  /**
   * @description: 创建用户
   * @param {*} user
   * @return {*}
   */
  async create(data: CreateUserDto): Promise<ResponseData<null>> {
    try {
      // 判断用户是否存在
      const user = await getRepository(User)
        .createQueryBuilder('user')
        .where('user.username = :username', { username: data.username })
        .getOne();
      if (user) {
        throw new HttpException(`账号已存在`, HttpStatus.BAD_REQUEST);
      }

      // 创建用户 这个效率低
      const entity = this.userRepository.create(data);
      await this.userRepository.save(entity);

      return { code: 1, message: '创建成功' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  /**
   * @description: 根据用户名查找用户
   * @param {*}
   * @return {*}
   */
  async findOneByName(username: string): Promise<User> {
    return await this.userRepository.findOne({ username });
  }

  /**
   * @description: 根据用户id查找用户
   * @param {*}
   * @return {*}
   */
  async findOneById(id: number): Promise<User> {
    const entity = await getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .leftJoinAndSelect('role.menus', 'menu')
      .where('user.id = :id', { id: id })
      .getOne();

    if (!entity) throw new NotFoundException('用户不存在');
    return entity;
  }

  /**
   * @description: 获取用户列表
   * @param {*}
   * @return {*}
   */
  async findListAndCount(
    queryOption: QueryUserDto,
  ): Promise<ResponseData<[User[], number]>> {
    const {
      pageNumber = 1,
      pageSize = 10,
      username,
      mobile,
      status,
      ifManage,
      ifDelete,
      created,
      updated,
    } = queryOption;
    const queryOptionList = [];
    if (username) queryOptionList.push('user.username LIKE :username');
    if (mobile) queryOptionList.push('user.mobile = :mobile');
    if (ifManage) queryOptionList.push('user.ifManage = :ifManage');
    if (status) queryOptionList.push('user.status = :status');
    if (ifDelete) queryOptionList.push('user.ifDelete = :ifDelete');
    if (created) queryOptionList.push('user.created = :created');
    if (updated) queryOptionList.push('user.updated = :updated');
    const queryOptionStr = queryOptionList.join(' AND ');

    const data = await getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where(queryOptionStr, queryOption)
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { code: 1, message: '查询成功', data: data };
  }
  /**
   * @description: 给用户分配角色
   * @param {deployRoleDto} deployDto
   * @return {*}
   */
  async deployRole(deployDto: DeployRoleDto): Promise<ResponseData<null>> {
    const { id, roles } = deployDto;
    let roleIdList = [];

    // 查找用户
    const user = await this.findOneById(id);
    // 判断用户是否存在
    if (!user) throw new NotFoundException('用户不存在');

    // 遍历角色
    if (roles.replace(/(^\s*)|(\s*$)/g, '') !== '') {
      roleIdList = roles.split(',');
    }

    await getManager().transaction(async (entityManager: EntityManager) => {
      // 赋值角色
      if (roleIdList.length > 0) {
        user.roles = await this.roleService.findList(roleIdList);
      } else {
        user.roles = [];
      }
      await entityManager.save(user);
    });

    return { code: 1, message: '分配角色成功' };
  }

  /**
   * @description: 修改用户密码
   * @param {changePwdDto} changePwdDto
   * @return {*}
   */
  async changePwd(changePDto: changePwdDto): Promise<ResponseData<null>> {
    const { id, password } = changePDto;
    try {
      const toUpdate = await this.findOneById(id);
      const updated = Object.assign(toUpdate, { password: password });
      await getRepository(User).save(updated);
      return { code: 1, message: '修改成功' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
