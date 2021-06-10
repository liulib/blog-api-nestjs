import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: '标签名不能为空' })
  @IsString()
  readonly tagName: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly tagDes: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: '标签是否删除不能为空' })
  @IsNumber()
  readonly isDelete: number;
}

export class UpdateTagDto extends CreateTagDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: '分类ID不能为空' })
  @IsNumber()
  readonly id: number;
}
