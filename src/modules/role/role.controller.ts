import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import {
  CreateRoleDto,
  UpdateRoleDto,
  DeployMenuDto,
  QueryRoleDto,
} from './role.dto';
import { Role } from './role.entity';

import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PermissionGuard, Perms } from '@/modules/auth/perms.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('角色模块')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @ApiOperation({
    summary: '创建角色',
  })
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Perms('/admin/system/role/create')
  @Post('create')
  async create(@Body() cto: CreateRoleDto) {
    return this.roleService.create(cto);
  }

  @ApiOperation({
    summary: '更新角色',
  })
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Perms('/admin/system/role/updateById')
  @Post('updateById')
  async update(@Body() uto: UpdateRoleDto) {
    return this.roleService.update(uto);
  }

  @ApiOperation({
    summary: '为角色赋权',
  })
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Perms('/admin/system/role/deployMenu')
  @Post('deployMenu')
  async deployRole(@Body() deployDto: DeployMenuDto) {
    return this.roleService.deployMenu(deployDto);
  }

  @ApiOperation({
    summary: '获取角色列表分页',
  })
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Perms('/admin/system/role/getRoleList')
  @ApiOkResponse({ type: Role })
  @Get('getRoleList')
  async getRoleList(@Query() qto: QueryRoleDto) {
    return this.roleService.findListAndCount(qto);
  }

  @ApiOperation({
    summary: '获取全部角色列表不分页',
  })
  @ApiOkResponse({ type: Role })
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Perms('/admin/system/role/getRoleAll')
  @Get('getRoleAll')
  async getRoleAll() {
    return this.roleService.findAll();
  }
}
