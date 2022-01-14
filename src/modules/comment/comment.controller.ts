import { Controller, Post, Body, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CommentService } from './comment.service';

import { PermissionGuard, Perms } from '@/modules/auth/perms.guard';

import { CreateCommentDto, QueryOptionDto } from './comment.dto';
import { User } from '@/common/decorators/user.decorator';
import { Comment } from './comment.entity';

import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('评论模块')
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiOperation({
    summary: '创建评论',
  })
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Perms('/admin/system/comment/create')
  @Post('create')
  async create(@Body() cto: CreateCommentDto, @User() user) {
    return this.commentService.create(cto, user);
  }

  @ApiOperation({
    summary: '查询评论分页',
  })
  @ApiOkResponse({ type: Comment })
  @Get('getList')
  async findListByArticleId(@Query() qto: QueryOptionDto) {
    return this.commentService.findListByArticleId(qto);
  }
}
