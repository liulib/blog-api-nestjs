import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QueryOptionsDto } from '@/common/dto/queryOptionDto';
import { Type } from 'class-transformer';

export class CreateCommentDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: '评论内容不能为空' })
  @IsString()
  readonly content: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: '回复ID不能为空' })
  @IsNumber()
  readonly replyId: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: '文章ID不能为空' })
  @IsNumber()
  readonly articleId: number;
}

export class QueryOptionDto extends QueryOptionsDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: '文章ID不能为空' })
  @Type(() => Number)
  @IsNumber()
  readonly articleId: number;
}
