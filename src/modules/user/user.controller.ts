import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdateUserDto,
  changePwdDto,
  QueryUserDto,
  FindByIdDto,
} from './user.dto';

import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { User } from './user.entity';

import { PermissionGuard, Perms } from '@/modules/auth/perms.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary: '创建用户',
  })
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Perms('/admin/system/user/create')
  @Post('create')
  async create(@Body() cto: CreateUserDto) {
    return await this.userService.create(cto);
  }

  @ApiOperation({
    summary: '根据用户id修改密码',
  })
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Perms('/admin/system/user/changePwd')
  @Post('changePwd')
  async changePwd(@Body() changePDto: changePwdDto) {
    return await this.userService.changePwd(changePDto);
  }

  @ApiOperation({
    summary: '获取用户列表',
  })
  @ApiOkResponse({ type: User })
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Perms('/admin/system/user/getUserList')
  @Get('getUserList')
  async getList(@Query() qto: QueryUserDto) {
    return await this.userService.findListAndCount(qto);
  }

  @ApiOperation({
    summary: '根据用户id更新用户',
  })
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Perms('/admin/system/user/updateUser')
  @Post('updateUser')
  async updateUser(@Body() updateDto: UpdateUserDto) {
    return await this.userService.updateUser(updateDto);
  }
}
