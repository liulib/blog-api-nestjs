import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import {
  CreateRoleDto,
  UpdateRoleDto,
  DeployMenuDto,
  QueryRoleDto,
} from './role.dto';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  async create(@Body() cto: CreateRoleDto) {
    return this.roleService.create(cto);
  }

  @Post('updateById')
  async update(@Body() uto: UpdateRoleDto) {
    return this.roleService.update(uto);
  }

  @Post('deployMenu')
  async deployRole(@Body() deployDto: DeployMenuDto) {
    return this.roleService.deployMenu(deployDto);
  }

  @Get('getRoleList')
  async getRoleList(@Query() qto: QueryRoleDto) {
    return this.roleService.findListAndCount(qto);
  }

  @Get('getRoleAll')
  async getRoleAll() {
    return this.roleService.findAll();
  }
}
