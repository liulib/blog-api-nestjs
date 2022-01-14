import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto, UpdateMenuDto } from './menu.dto';

import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PermissionGuard, Perms } from '@/modules/auth/perms.guard';
import { AuthGuard } from '@nestjs/passport';

import { Menu } from './menu.entity';

@ApiTags('菜单模块')
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @ApiOperation({
    summary: '创建菜单',
  })
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Perms('/admin/system/menu/create')
  @Post('create')
  async create(@Body() cto: CreateMenuDto) {
    return this.menuService.create(cto);
  }

  @ApiOperation({
    summary: '更新菜单',
  })
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Perms('/admin/system/menu/updateById')
  @Post('updateById')
  async update(@Body() uto: UpdateMenuDto) {
    return this.menuService.updateById(uto);
  }

  @ApiOperation({
    summary: '获取全部菜单',
  })
  @ApiOkResponse({ type: Menu })
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Perms('/admin/system/menu/getMenuAll')
  @Get('getMenuAll')
  async getMenuAll() {
    return this.menuService.findAll();
  }
}
