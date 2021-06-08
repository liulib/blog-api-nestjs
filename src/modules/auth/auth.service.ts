import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './auth.dto';
import { JwtPayLoad, LoginRes } from './auth.interface';
import { JwtService } from '@nestjs/jwt';

import { ResponseData } from '../../common/interfaces/response.interface';

import { Menu } from '../menu/menu.entity';

import { hashPassword, comparePassword } from '../../common/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @description: 登录
   * @param {LoginDto} data
   * @return {*}
   */
  async login(data: LoginDto): Promise<ResponseData<LoginRes>> {
    const { account, password } = data;

    const entity = await this.userService.findDetailByName(account);

    if (!entity) {
      return {
        code: 0,
        message: '用户名不存在',
      };
    }

    if (!(await comparePassword(password, entity.password))) {
      return {
        code: 0,
        message: '密码错误',
      };
    }

    const { id, roles, username } = entity;

    // 所有菜单
    let menuList: Menu[] = [];

    roles.forEach(item => {
      menuList = Array.from(new Set([...menuList, ...item.menus]));
    });

    // token
    const token = this.signToken({ id, account });

    return {
      code: 1,
      message: '登录成功',
      data: { token, menuList, username },
    };
  }

  /**
   * @description: 获取token
   * @param {LoginDto} data
   * @return {*}
   */
  async getToken(data: LoginDto): Promise<ResponseData<string>> {
    const { account, password } = data;

    const entity = await this.userService.findOneByName(account);

    if (!entity) {
      return {
        code: 0,
        message: '用户名不存在',
      };
    }

    if (!(await comparePassword(password, entity.password))) {
      return {
        code: 0,
        message: '密码错误',
      };
    }

    const { id } = entity;
    const token = this.signToken({ id, account });

    return {
      code: 1,
      message: '请求成功',
      data: token,
    };
  }

  /**
   * @description: 签发token
   * @param {JwtPayLoad} data
   * @return {*}
   */
  signToken(data: JwtPayLoad) {
    return this.jwtService.sign(data);
  }
}
