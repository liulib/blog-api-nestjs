import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { QueryOptionsDto } from '@/common/dto/queryOptionDto';
import { Type } from 'class-transformer';

export class QueryOptionDto extends QueryOptionsDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly ipAddress: string;

  @ApiPropertyOptional({ type: Number })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  readonly status: number;
}

export class UpdateIpDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: 'Ip的id不能为空' })
  @IsNumber()
  readonly id: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: '状态不能为空' })
  @IsNumber()
  readonly status: number;
}
