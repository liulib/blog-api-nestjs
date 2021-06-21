import { Controller, Post, Get, Body } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto, UpdateMenuDto } from './menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Post('create')
  async create(@Body() cto: CreateMenuDto) {
    return this.menuService.create(cto);
  }

  @Post('updateById')
  async update(@Body() uto: UpdateMenuDto) {
    return this.menuService.updateById(uto);
  }

  @Get('getMenuAll')
  async getMenuAll() {
    return this.menuService.findAll();
  }
}
