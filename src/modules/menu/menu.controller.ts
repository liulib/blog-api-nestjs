import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto, UpdateMenuDto } from './menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Post('create')
  async create(@Body() cto: CreateMenuDto) {
    return this.menuService.create(cto);
  }

  @Post('update')
  async update(@Body() uto: UpdateMenuDto) {
    return this.menuService.update(uto);
  }

  @Get('getMenuList')
  async findListAndCount() {
    return this.menuService.findAll();
  }
}
