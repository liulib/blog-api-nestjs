import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('权限认证模块')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '获取token，此接口暂时没用，本来预留用来刷新token的',
  })
  @Post('getToken')
  async getToken(@Body() data: LoginDto) {
    const res = await this.authService.getToken(data);
    return res;
  }

  @ApiOperation({
    summary: '登录接口，返回token及菜单信息，具体接口看请求吧~~~',
  })
  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }
}
