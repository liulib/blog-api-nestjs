import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('create')
  async create(@Body() cto: CreateCategoryDto) {
    return this.categoryService.create(cto);
  }

  @Post('updateById')
  async update(@Body() uto: UpdateCategoryDto) {
    return this.categoryService.update(uto);
  }

  @Get('findList')
  async findList() {
    return this.categoryService.findList();
  }
}
