import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './auth.dto';
import { JwtPayLoad, LoginRes, GithubLoginRes } from './auth.interface';
import { JwtService } from '@nestjs/jwt';

import { ResponseData } from '../../common/interfaces/response.interface';
import { Menu } from '../menu/menu.entity';
import { comparePassword } from '../../common/utils/bcrypt';
import { GithubRes, GithubUserInfo } from './auth.interface';

import config from '@/config';

import * as superagent from 'superagent';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // 登录
  async login(data: LoginDto): Promise<ResponseData<LoginRes>> {
    const { account, password } = data;
    const entity = await this.userService.findDetailByName(account);

    if (!entity) return { code: 0, message: '用户名不存在' };

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

  // github登录
  async githubLogin(qto): Promise<ResponseData<GithubLoginRes>> {
    const { code } = qto;

    const client_id = config().GITHUB_OAUTH2.client_id;
    const client_secret = config().GITHUB_OAUTH2.client_secret;
    const access_token_url = config().GITHUB_OAUTH2.access_token_url;
    const fetch_user_url = config().GITHUB_OAUTH2.fetch_user_url;

    // 拿到 code， 请求 access_token
    const result = await superagent.post(access_token_url).send({
      code,
      client_id,
      client_secret,
    });

    // 返回带有 access_token 的字符串
    const callbackUrl = result.text;

    const params: GithubRes = {
      access_token: '',
      token_type: '',
    };
    const paramsStr = callbackUrl.replace(/\.*\?/, '');
    paramsStr.split('&').forEach(v => {
      const d = v.split('=');
      if (d[1] && d[0]) params[d[0]] = d[1];
    });

    const { access_token } = params;

    // 拿 token 取用户的数据
    const userInfoRes = await superagent
      .get(fetch_user_url)
      .set('Authorization', `Bearer ${access_token}`)
      .set(
        'User-Agent',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
      );

    const userInfo: GithubUserInfo = JSON.parse(userInfoRes.text);

    let entity = await this.userService.findDetailByName(String(userInfo.id));

    if (!entity) {
      entity = await this.userService.createGithubUser({
        id: userInfo.id,
        login: userInfo.login,
        avatar_url: userInfo.avatar_url,
      });
    }

    const { id, account } = entity;

    // token
    const token = this.signToken({ id, account });

    return {
      code: 1,
      message: 'github登录成功',
      data: {
        token,
        username: userInfo.login,
      },
    };
  }

  // 获取token
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

  // 签发token
  signToken(data: JwtPayLoad) {
    return this.jwtService.sign(data);
  }
}
