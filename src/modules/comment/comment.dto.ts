import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { QueryOptionsDto } from '@/common/dto/queryOptionDto';
import { Type } from 'class-transformer';

export class CreateCommentDto {
  @ApiProperty({ type: String, description: '评论内容', required: true })
  @IsNotEmpty({ message: '评论内容不能为空' })
  @IsString()
  readonly content: string;

  @ApiProperty({ type: Number, description: '回复ID', required: true })
  @IsNotEmpty({ message: '回复ID不能为空' })
  @IsNumber()
  readonly replyId: number;

  @ApiProperty({ type: Number, description: '文章ID', required: true })
  @IsNotEmpty({ message: '文章ID不能为空' })
  @IsNumber()
  readonly articleId: number;
}

export class QueryOptionDto extends QueryOptionsDto {
  @ApiProperty({ type: Number, description: '文章ID', required: true })
  @IsNotEmpty({ message: '文章ID不能为空' })
  @Type(() => Number)
  @IsNumber()
  readonly articleId: number;
}

export class QueryAllDto {
  @ApiProperty({ type: Number, description: '文章ID', required: true })
  @IsNotEmpty({ message: '文章ID不能为空' })
  @Type(() => Number)
  @IsNumber()
  readonly articleId: number;
}
