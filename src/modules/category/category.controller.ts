import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { CategoryService } from './category.service';

import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PermissionGuard, Perms } from '@/modules/auth/perms.guard';
import { AuthGuard } from '@nestjs/passport';

import { Category } from './category.entity';

@ApiTags('分类模块')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiOperation({
    summary: '创建分类',
  })
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Perms('/admin/system/category/create')
  @Post('create')
  async create(@Body() cto: CreateCategoryDto) {
    return this.categoryService.create(cto);
  }

  @ApiOperation({
    summary: '更新分类',
  })
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Perms('/admin/system/category/updateById')
  @Post('updateById')
  async update(@Body() uto: UpdateCategoryDto) {
    return this.categoryService.update(uto);
  }

  @ApiOperation({
    summary: '查询所有分类不分页',
  })
  @ApiOkResponse({ type: Category })
  @Get('findAll')
  async findAll() {
    return this.categoryService.findAll();
  }
}
