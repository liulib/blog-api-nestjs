import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryOptionsDto {
  @ApiProperty({ description: '一页显示多少条' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly pageSize: number;

  @ApiProperty({ description: '当前页' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly page: number;
}
