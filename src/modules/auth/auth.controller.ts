import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { User } from '@/common/decorators/user.decorator';

import { PermissionGuard, Perms } from './perms.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('getToken')
  async getToken(@Body() data: LoginDto) {
    const res = await this.authService.getToken(data);
    return res;
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    const res = await this.authService.login(data);
    return res;
  }

  @Get('test')
  @UseGuards(AuthGuard('basic'), PermissionGuard)
  @Perms('/system')
  async test(@User() user) {
    console.log(user);
    return '验证';
  }
}
