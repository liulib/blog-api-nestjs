import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

import { Type } from 'class-transformer';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { QueryOptionsDto } from '@/common/dto/queryOptionDto';

export class CreateArticleDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: '文章标题不能为空' })
  @IsString()
  readonly title: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: '文章简介不能为空' })
  @IsString()
  readonly brief: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: '文章内容不能为空' })
  @IsString()
  readonly content: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: '文章是否删除不能为空' })
  @IsNumber()
  readonly isDelete: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: '文章分类ID不能为空' })
  @IsNumber()
  readonly categoryId: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly tags: string;
}

export class UpdateArticleDto extends CreateArticleDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: '文章ID不能为空' })
  @IsNumber()
  readonly id: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  readonly viewCount: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  readonly thumbsUpCount: number;
}

export class QueryArticleOptionDto extends QueryOptionsDto {
  @ApiPropertyOptional({ type: Number })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  readonly tagId: number;

  @ApiPropertyOptional({ type: Number })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  readonly categoryId: number;

  @ApiPropertyOptional({ type: Number })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  readonly isDelete: number;
}

export class QueryArticleDetailDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: '文章ID不能为空' })
  @Type(() => Number)
  @IsNumber()
  readonly id: number;
}
