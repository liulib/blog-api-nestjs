import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({ type: String, description: '标签名', required: true })
  @IsNotEmpty({ message: '标签名不能为空' })
  @IsString()
  readonly tagName: string;

  @ApiProperty({
    type: String,
    description: '标签描述',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly tagDes: string;

  @ApiProperty({
    type: String,
    description: '标签描述',
    required: true,
  })
  @IsNotEmpty({ message: '标签颜色不能为空' })
  @IsString()
  readonly tagColor: string;

  @ApiProperty({
    type: Number,
    description: '是否删除 1删除 0未删除',
    required: true,
  })
  @IsNotEmpty({ message: '标签是否删除不能为空' })
  @IsNumber()
  readonly isDelete: number;
}

export class UpdateTagDto extends CreateTagDto {
  @ApiProperty({
    type: Number,
    description: '标签id',
    required: true,
  })
  @IsNotEmpty({ message: '标签id不能为空' })
  @IsNumber()
  readonly id: number;
}
