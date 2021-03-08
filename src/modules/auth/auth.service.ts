import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './auth.dto';
import { JwtPayLoad } from './auth.interface';
import { JwtService } from '@nestjs/jwt';

import { ResponseData } from '../../common/interfaces/response.interface';

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
  async login(data: LoginDto): Promise<ResponseData<string>> {
    const { username, password } = data;

    const entity = await this.userService.findOneByName(username);

    if (!entity) {
      return {
        code: 0,
        message: '用户名不存在',
      };
    }

    if (!(await entity.comparePassWord(password))) {
      return {
        code: 0,
        message: '密码错误',
      };
    }

    const { id } = entity;
    const token = this.signToken({ id, username });

    return {
      code: 1,
      message: '登录成功',
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
