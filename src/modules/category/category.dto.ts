import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: '分类名不能为空' })
  @IsString()
  readonly categoryName: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly categoryDes: string;

  @ApiProperty({ type: Number })
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
