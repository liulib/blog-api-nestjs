import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { QueryOptionsDto } from '@/common/dto/queryOptionDto';
import { Type } from 'class-transformer';

export class QueryOptionDto extends QueryOptionsDto {
  @ApiProperty({ type: String, description: 'ip地址', required: false })
  @IsOptional()
  @IsString()
  readonly ipAddress: string;

  @ApiProperty({
    type: Number,
    description: '状态 1正常 0禁用',
    required: true,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  readonly status: number;
}

export class UpdateIpDto {
  @ApiProperty({ type: Number, description: 'ip id', required: true })
  @IsNotEmpty({ message: 'Ip的id不能为空' })
  @IsNumber()
  readonly id: number;

  @ApiProperty({
    type: Number,
    description: '状态 1正常 0禁用',
    required: true,
  })
  @IsNotEmpty({ message: '状态不能为空' })
  @IsNumber()
  readonly status: number;
}
