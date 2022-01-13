import { Controller, Post, Get, Body, Query, Request } from '@nestjs/common';

import { ArticleService } from './article.service';

import {
  CreateArticleDto,
  UpdateArticleDto,
  QueryArticleOptionDto,
  QueryArticleDetailDto,
} from './article.dto';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post('create')
  async create(@Body() cto: CreateArticleDto) {
    return this.articleService.create(cto);
  }

  @Post('updateById')
  async update(@Body() uto: UpdateArticleDto) {
    return this.articleService.update(uto);
  }

  @Get('getList')
  async findListAndCount(@Query() qto: QueryArticleOptionDto) {
    return this.articleService.findListAndCount(qto);
  }

  @Get('getDetailById')
  async findDetailById(@Query() qto: QueryArticleDetailDto, @Request() req) {
    return this.articleService.findDetailById(qto, req);
  }

  @Get('getTopicList')
  async findTopicList() {
    return this.articleService.findTopicList();
  }
}
