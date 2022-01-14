import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto, UpdateTagDto } from './tag.dto';

import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PermissionGuard, Perms } from '@/modules/auth/perms.guard';
import { AuthGuard } from '@nestjs/passport';

import { Tag } from './tag.entity';

@ApiTags('标签模块')
@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @ApiOperation({
    summary: '创建标签',
  })
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Perms('/admin/system/tag/create')
  @Post('create')
  async create(@Body() cto: CreateTagDto) {
    return this.tagService.create(cto);
  }

  @ApiOperation({
    summary: '更新标签',
  })
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Perms('/admin/system/tag/updateById')
  @Post('updateById')
  async update(@Body() uto: UpdateTagDto) {
    return this.tagService.update(uto);
  }

  @ApiOperation({
    summary: '查询所有标签不分页',
  })
  @ApiOkResponse({ type: Tag })
  @Get('findAll')
  async findAll() {
    return this.tagService.findAll();
  }
}
