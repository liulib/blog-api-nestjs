import { Controller, Post, Body, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CommentService } from './comment.service';
import { PermissionGuard, Perms } from '@/modules/auth/perms.guard';
import { CreateCommentDto, QueryOptionDto } from './comment.dto';
import { User } from '@/common/decorators/user.decorator';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Perms('/admin')
  @Post('create')
  async create(@Body() cto: CreateCommentDto, @User() user) {
    return this.commentService.create(cto, user);
  }

  @Get('getList')
  async findListByArticleId(@Query() qto: QueryOptionDto) {
    return this.commentService.findListByArticleId(qto);
  }
}
