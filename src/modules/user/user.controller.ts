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

import { ResponseData } from '@/common/interfaces/response.interface';
import { pageData } from '@/common/interfaces/pageData.interface';

import { PermissionGuard, Perms } from '@/modules/auth/perms.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary: '创建用户',
  })
  @UseGuards(AuthGuard(), PermissionGuard)
  @Perms('/admin/system/user/create')
  @Post('create')
  async create(@Body() cto: CreateUserDto): Promise<ResponseData<null>> {
    const res = await this.userService.create(cto);
    console.log('create');
    console.log(res);

    if (res) {
      return { code: 1, message: '创建成功' };
    } else {
      return { code: 0, message: '该用户已存在' };
    }
  }

  @ApiOperation({
    summary: '根据用户id查找用户 带角色和菜单',
  })
  @ApiOkResponse({ type: User })
  @UseGuards(AuthGuard(), PermissionGuard)
  @Perms('/admin/system/user/getById')
  @Get('getById')
  async getById(@Query() dto: FindByIdDto): Promise<ResponseData<User>> {
    const res = await this.userService.findOneById(dto.id);
    if (res) {
      return { code: 1, message: '查询成功', data: res };
    } else {
      return { code: 0, message: '未查询到用户' };
    }
  }

  @ApiOperation({
    summary: '根据用户id修改密码',
  })
  @UseGuards(AuthGuard(), PermissionGuard)
  @Perms('/admin/system/user/changePwd')
  @Post('changePwd')
  async changePwd(
    @Body() changePDto: changePwdDto,
  ): Promise<ResponseData<null>> {
    await this.userService.changePwd(changePDto);
    return { code: 1, message: '修改成功' };
  }

  @ApiOperation({
    summary: '获取用户列表',
  })
  @ApiOkResponse({ type: User })
  @UseGuards(AuthGuard(), PermissionGuard)
  @Perms('/admin/system/user/getUserList')
  @Get('getUserList')
  async getList(
    @Query() qto: QueryUserDto,
  ): Promise<ResponseData<pageData<User>>> {
    const data = await this.userService.findListAndCount(qto);
    return {
      code: 1,
      message: '查询成功',
      data: data,
    };
  }

  @ApiOperation({
    summary: '根据用户id更新用户',
  })
  @UseGuards(AuthGuard(), PermissionGuard)
  @Perms('/admin/system/user/updateUser')
  @Post('updateUser')
  async updateUser(
    @Body() updateDto: UpdateUserDto,
  ): Promise<ResponseData<null>> {
    await this.userService.updateUser(updateDto);
    return {
      code: 1,
      message: '修改成功',
    };
  }
}
