import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { QueryOptionsDto } from '@/common/dto/queryOptionDto';
import { Type } from 'class-transformer';

export class CreateRoleDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty({ message: '角色名不能为空' })
  readonly roleName: string;
  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  readonly remark?: string;
  @ApiProperty({ type: Number })
  @IsOptional()
  @IsNumber()
  readonly isDelete?: number;
}

export class UpdateRoleDto extends CreateRoleDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: '角色id不能为空' })
  @IsNumber()
  readonly id: number;
}

export class QueryRoleDto extends QueryOptionsDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly roleName: string;
  @ApiPropertyOptional({ type: Number })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  readonly isDelete: number;
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly created: string;
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly updated: string;
}

export class DeployMenuDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: '用户id不能为空' })
  @IsNumber()
  readonly id: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly menus: string;
}
