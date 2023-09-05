import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ArticleService } from './article.service';

import {
  CreateArticleDto,
  UpdateArticleDto,
  QueryArticleOptionDto,
  QueryArticleDetailDto,
  QueryArticleDetailByUrlDto,
} from './article.dto';

import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PermissionGuard, Perms } from '@/modules/auth/perms.guard';
import { AuthGuard } from '@nestjs/passport';

import { Article } from './article.entity';

@ApiTags('文章模块')
@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @ApiOperation({
    summary: '创建文章',
  })
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Perms('/admin/system/article/create')
  @Post('create')
  async create(@Body() cto: CreateArticleDto) {
    return this.articleService.create(cto);
  }

  @ApiOperation({
    summary: '更新文章',
  })
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Perms('/admin/system/article/updateById')
  @Post('updateById')
  async update(@Body() uto: UpdateArticleDto) {
    return this.articleService.update(uto);
  }

  @ApiOperation({
    summary: '查询文章列表分页',
  })
  @ApiOkResponse({ type: Article })
  @Get('getList')
  async findListAndCount(@Query() qto: QueryArticleOptionDto) {
    return this.articleService.findListAndCount(qto);
  }

  @ApiOperation({
    summary: '查询全部文章',
  })
  @ApiOkResponse({ type: Article })
  @Get('getAll')
  async findAll() {
    return this.articleService.findAll();
  }

  @ApiOperation({
    summary: '查询文章详情',
  })
  @ApiOkResponse({ type: Article })
  @Get('getDetailById')
  async findDetailById(@Query() qto: QueryArticleDetailDto, @Request() req) {
    return this.articleService.findDetailById(qto, req);
  }

  @ApiOperation({
    summary: '查询文章详情 - url',
  })
  @ApiOkResponse({ type: Article })
  @Get('getDetailByUrl')
  async findDetailByUrl(
    @Query() qto: QueryArticleDetailByUrlDto,
    @Request() req,
  ) {
    return this.articleService.findDetailByUrl(qto, req);
  }

  @ApiOperation({
    summary: '查询热门文章',
  })
  @ApiOkResponse({ type: Article })
  @Get('getTopicList')
  async findTopicList() {
    return this.articleService.findTopicList();
  }
}
