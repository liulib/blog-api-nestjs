/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2021-01-28 23:27:34
 * @LastEditors  : liulib
 * @LastEditTime : 2021-01-28 23:48:10
 */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifyCallback } from 'passport-jwt';
import { JwtPayLoad } from '../auth.interface';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'lGq78nsY2dRdMA4DKbZUbOcVm9U2lCEb',
    });
  }
  async validate(payload: JwtPayLoad) {
    const { id } = payload;
    const user = await this.userService.findOneById(id);
    return user;
  }
}
