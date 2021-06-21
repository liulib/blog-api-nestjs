import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { QueryOptionsDto } from '@/common/dto/queryOptionDto';
import { Type } from 'class-transformer';

export class QueryOptionDto extends QueryOptionsDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly ip: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly url: string;
}
