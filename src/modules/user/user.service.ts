import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  getRepository,
  getManager,
  EntityManager,
  getConnection,
} from 'typeorm';
import { User } from './user.entity';
import {
  CreateUserDto,
  DeployRoleDto,
  QueryUserDto,
  changePwdDto,
  UpdateUserDto,
} from './user.dto';

import { GithubUserInfo } from '@/modules/auth/auth.interface';

import { RoleService } from '../role/role.service';

import { ResponseData } from '@/common/interfaces/response.interface';
import { pageData } from '@/common/interfaces/pageData.interface';

import { hashPassword } from '@/common/utils/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  // 创建用户
  async create(data: CreateUserDto): Promise<ResponseData<null>> {
    try {
      const { account, roles = '', password, ...others } = data;
      let roleIdList = [];

      // 判断用户是否存在
      const user = await getRepository(User)
        .createQueryBuilder('user')
        .where('user.account = :account', { account })
        .getOne();

      if (user) {
        return { code: 0, message: '该用户已存在' };
      }

      // 遍历角色
      if (roles.replace(/(^\s*)|(\s*$)/g, '') !== '') {
        roleIdList = roles.split(',');
      }

      // hash密码
      const hashedPassword = hashPassword(password);

      await getManager().transaction(async (entityManager: EntityManager) => {
        // 创建用户 这个效率低
        const user = this.userRepository.create({
          account,
          password: hashedPassword,
          ...others,
        });
        // 赋值角色
        if (roleIdList.length > 0) {
          user.roles = await this.roleService.findList(roleIdList);
        } else {
          user.roles = [];
        }
        // 保存关联关系
        await entityManager.save(user);
      });

      return { code: 1, message: '创建成功' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 根据用户名查找用户详细信息;
  async findDetailByName(account: string): Promise<User> {
    return await getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .leftJoinAndSelect('role.menus', 'menu')
      .addSelect('user.password')
      .where('user.account = :account', { account: account })
      .getOne();
  }

  // 根据用户账号查找用户;
  async findOneByName(account: string): Promise<User> {
    return await getRepository(User)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .leftJoinAndSelect('user.roles', 'role')
      .leftJoinAndSelect('role.menus', 'menu')
      .where('user.account = :account', { account: account })
      .getOne();
  }

  // 根据用户id查找用户 带角色和菜单
  async findOneById(id: number): Promise<User> {
    return await getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .leftJoinAndSelect('role.menus', 'menu')
      .where('user.id = :id', { id: id })
      .getOne();
  }

  // 获取用户列表
  async findListAndCount(
    queryOption: QueryUserDto,
  ): Promise<ResponseData<pageData<User>>> {
    const {
      page = 1,
      pageSize = 10,
      account,
      mobile,
      status,
      ifManage,
      ifDelete,
      created,
      updated,
    } = queryOption;

    const [number, size] = [Number(page), Number(pageSize)];

    const queryOptionList = [];
    if (account) queryOptionList.push('user.account LIKE :account');
    if (mobile) queryOptionList.push('user.mobile = :mobile');
    if (ifManage) queryOptionList.push('user.ifManage = :ifManage');
    if (status) queryOptionList.push('user.status = :status');
    if (ifDelete) queryOptionList.push('user.ifDelete = :ifDelete');
    if (created) queryOptionList.push('user.created = :created');
    if (updated) queryOptionList.push('user.updated = :updated');
    const queryOptionStr = queryOptionList.join(' AND ');

    const [list, total] = await getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where(queryOptionStr, queryOption)
      .skip((number - 1) * size)
      .take(size)
      .getManyAndCount();

    const data = { list, total, page: number, pageSize: size };

    return {
      code: 1,
      message: '查询成功',
      data: data,
    };
  }

  // 给用户分配角色;
  async deployRole(deployDto: DeployRoleDto): Promise<ResponseData<null>> {
    const { id, roles = '' } = deployDto;
    let roleIdList = [];

    // 查找用户
    const user = await this.findOneById(id);
    if (!user) return { code: 0, message: '用户不存在' };

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

  // 修改用户密码
  async changePwd(changePDto: changePwdDto): Promise<ResponseData<null>> {
    const { id, password } = changePDto;
    // 检测用户是否存在
    const toUpdate = await this.findOneById(id);
    if (!toUpdate)
      return {
        code: 0,
        message: '用户不存在',
      };

    // hash密码
    const hashedPassword = hashPassword(password);

    const updated = Object.assign(toUpdate, {
      password: hashedPassword,
    });

    await getRepository(User).save(updated);

    return {
      code: 1,
      message: '修改成功',
    };
  }

  // 更新用户
  async updateUser(updateDto: UpdateUserDto) {
    const { id, roles = '', ...others } = updateDto;
    let roleIdList = [];
    // 遍历角色字符串
    if (roles.replace(/(^\s*)|(\s*$)/g, '') !== '') {
      roleIdList = roles.split(',');
    }

    await getManager().transaction(
      async (entityManager: EntityManager): Promise<ResponseData<null>> => {
        // 更新用户
        // await entityManager.update(User, id, others);
        // const toUpdate = await this.findOneById(id);
        // const updated = Object.assign(toUpdate, others);
        // await getRepository(User).save(updated);
        await getConnection()
          .createQueryBuilder()
          .update(User)
          .set(others)
          .where('id = :id', { id: id })
          .execute();

        // 查询用户是否存在
        const user = await getRepository(User)
          .createQueryBuilder('user')
          .where('user.id = :id', {
            id: id,
          })
          .getOne();

        if (!user) return { code: 0, message: '用户不存在' };

        // 赋值角色
        if (roleIdList.length > 0) {
          user.roles = await this.roleService.findList(roleIdList);
        } else {
          user.roles = [];
        }

        await entityManager.save(user);
      },
    );

    return {
      code: 1,
      message: '修改成功',
    };
  }

  // 创建github用户
  async createGithubUser(data: GithubUserInfo) {
    const account = String(data.id);
    const username = String(data.login);
    const avatar = data.avatar_url;
    // hash密码 数据库未设置为空 直接使用账号做密码
    const hashedPassword = hashPassword(account);

    let userRes = null;

    await getManager().transaction(async (entityManager: EntityManager) => {
      // 创建用户 这个效率低
      const user = this.userRepository.create({
        account,
        password: hashedPassword,
        username,
        avatar,
      });
      // 赋值角色
      user.roles = await this.roleService.findList(['3']);
      // 保存关联关系
      userRes = await entityManager.save(user);
    });

    return userRes;
  }

  // 根据用户id查找用户 不带角色和菜单
  async finUserInfoById(id: number): Promise<User> {
    return await getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .getOne();
  }
}
