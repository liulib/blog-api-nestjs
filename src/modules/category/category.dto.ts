import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ type: String, description: '分类名', required: true })
  @IsNotEmpty({ message: '分类名不能为空' })
  @IsString()
  readonly categoryName: string;

  @ApiProperty({
    type: String,
    description: '分类描述',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly categoryDes: string;

  @ApiProperty({
    type: Number,
    description: '是否删除 1删除 0未删除',
    required: true,
  })
  @IsNotEmpty({ message: '分类是否删除不能为空' })
  @IsNumber()
  readonly isDelete: number;
}

export class UpdateCategoryDto extends CreateCategoryDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: '分类ID不能为空' })
  @IsNumber()
  readonly id: number;
}
