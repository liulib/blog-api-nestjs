import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

import { Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import { QueryOptionsDto } from '@/common/dto/queryOptionDto';

export class CreateArticleDto {
  @ApiProperty({ type: String, description: '文章标题', required: true })
  @IsNotEmpty({ message: '文章标题不能为空' })
  @IsString()
  readonly title: string;

  @ApiProperty({ type: String, description: '文章url', required: true })
  @IsNotEmpty({ message: '文章url' })
  @IsString()
  readonly url: string;

  @ApiProperty({ type: String, description: '文章简介', required: true })
  @IsNotEmpty({ message: '文章简介不能为空' })
  @IsString()
  readonly brief: string;

  @ApiProperty({ type: String, description: '文章内容', required: true })
  @IsNotEmpty({ message: '文章内容不能为空' })
  @IsString()
  readonly content: string;

  @ApiProperty({
    type: Number,
    description: '文章是否删除',
    required: true,
  })
  @IsNotEmpty({ message: '文章是否删除不能为空' })
  @IsNumber()
  readonly isDelete: number;

  @ApiProperty({
    type: Number,
    description: '文章分类ID',
    required: true,
  })
  @IsNotEmpty({ message: '文章分类ID不能为空' })
  @IsNumber()
  readonly categoryId: number;

  @ApiProperty({
    type: String,
    description: '文章标签id字符串 以,拼接 示例1,2,3,4,5',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly tags: string;
}

export class UpdateArticleDto extends CreateArticleDto {
  @ApiProperty({ type: Number, description: '文章ID', required: true })
  @IsNotEmpty({ message: '文章ID不能为空' })
  @IsNumber()
  readonly id: number;

  @ApiProperty({
    type: Number,
    description: '文章浏览数',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  readonly viewCount: number;

  @ApiProperty({
    type: Number,
    description: '文章点赞数',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  readonly thumbsUpCount: number;
}

export class QueryArticleOptionDto extends QueryOptionsDto {
  @ApiProperty({ type: Number, description: '标签id', required: false })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  readonly tagId: number;

  @ApiProperty({ type: Number, description: '分类id', required: false })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  readonly categoryId: number;

  @ApiProperty({
    type: Number,
    description: '是否删除 1删除 0未删除',
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  readonly isDelete: number;
}

export class QueryArticleDetailDto {
  @ApiProperty({ type: Number, description: '文章ID' })
  @IsNotEmpty({ message: '文章ID不能为空' })
  @Type(() => Number)
  @IsNumber()
  readonly id: number;
}

export class QueryArticleDetailByUrlDto {
  @ApiProperty({ type: Number, description: '文章url' })
  @IsNotEmpty({ message: '文章url不能为空' })
  @Type(() => String)
  @IsString()
  readonly url: string;
}
