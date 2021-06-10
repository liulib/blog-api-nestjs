import { Controller, Body, Post, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto, UpdateTagDto } from './tag.dto';

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Post('create')
  async create(@Body() cto: CreateTagDto) {
    return this.tagService.create(cto);
  }

  @Post('updateById')
  async update(@Body() uto: UpdateTagDto) {
    return this.tagService.update(uto);
  }

  @Get('findList')
  async findList() {
    return this.tagService.findAll();
  }
}
