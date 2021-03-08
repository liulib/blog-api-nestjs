import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { User } from '../../common/decorators/user.decorator';

import { PermissionGuard, Perms } from './perms.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    const res = await this.authService.login(data);
    return res;
  }

  @Get('test')
  @UseGuards(AuthGuard(), PermissionGuard)
  @Perms('admin')
  async test(@User() user) {
    return '验证';
  }
}
