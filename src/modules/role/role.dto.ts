import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { QueryOptionsDto } from '@/common/dto/queryOptionDto';

export class CreateRoleDto {
  @ApiProperty({ type: String, description: '角色名', required: true })
  @IsString()
  @IsNotEmpty({ message: '角色名不能为空' })
  readonly roleName: string;

  @ApiProperty({
    type: String,
    description: '角色备注',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly remark: string;

  @ApiProperty({
    type: Number,
    description: '是否删除 1删除 0未删除',
    required: true,
  })
  @IsNotEmpty({ message: '角色是否删除不能为空' })
  @IsNumber()
  readonly isDelete: number;
}

export class UpdateRoleDto extends CreateRoleDto {
  @ApiProperty({ type: Number, description: '角色id', required: true })
  @IsNotEmpty({ message: '角色id不能为空' })
  @IsNumber()
  readonly id: number;
}

export class QueryRoleDto extends QueryOptionsDto {
  @ApiProperty({ type: String, description: '角色名', required: false })
  @IsOptional()
  @IsString()
  readonly roleName: string;

  @ApiProperty({
    type: Number,
    description: '是否删除 1删除 0未删除',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  readonly isDelete: number;

  @ApiProperty({
    type: String,
    description: '创建时间',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly created: string;

  @ApiProperty({
    type: String,
    description: '删除时间',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly updated: string;
}

export class DeployMenuDto {
  @ApiProperty({ type: Number, description: '用户id', required: true })
  @IsNotEmpty({ message: '用户id不能为空' })
  @IsNumber()
  readonly id: number;

  @ApiProperty({
    type: Number,
    description: '菜单id字符串，以,拼接',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly menus: string;
}
