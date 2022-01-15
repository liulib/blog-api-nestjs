import { IsString, IsOptional } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { QueryOptionsDto } from '@/common/dto/queryOptionDto';

export class QueryOptionDto extends QueryOptionsDto {
  @ApiPropertyOptional({ type: String, description: 'ip地址', required: false })
  @IsOptional()
  @IsString()
  readonly ip: string;

  @ApiPropertyOptional({
    type: String,
    description: '请求地址',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly url: string;
}
