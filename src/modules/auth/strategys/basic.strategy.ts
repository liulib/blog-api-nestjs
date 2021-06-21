import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../../user/user.service';
import { comparePassword } from '../../../common/utils/bcrypt';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(req, account, password) {
    const user = await this.userService.findOneByName(account);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!(await comparePassword(password, user.password))) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
