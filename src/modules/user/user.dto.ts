import {
  IsNotEmpty,
  Length,
  IsString,
  IsOptional,
  IsNumber,
  IsInt,
  Min,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QueryOptionsDto } from '@/common/dto/queryOptionDto';
import { Type } from 'class-transformer';

import { User } from './user.entity';
import { Role } from '../role/role.entity';
import { Menu } from '../menu/menu.entity';

export class CreateUserDto {
  @ApiProperty({ type: String, description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString()
  readonly username: string;

  @ApiProperty({ type: String, description: '用户账号 长度6-30' })
  @IsNotEmpty({ message: '用户账号不能为空' })
  @Length(6, 30)
  @IsString()
  readonly account: string;

  @ApiProperty({ type: String, description: '密码 长度6-30' })
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 30)
  @IsString()
  readonly password: string;

  @ApiPropertyOptional({
    type: String,
    description: '角色id字符串以,拼接 示例1,2,3,4,5',
  })
  @IsOptional()
  @IsString()
  readonly roles: string;

  @ApiPropertyOptional({
    type: String,
    description: '邮箱',
  })
  @IsOptional()
  @IsString()
  readonly email?: string;

  @ApiPropertyOptional({ type: String, description: '手机号' })
  @IsOptional()
  @IsString()
  readonly mobile?: string;

  @ApiPropertyOptional({
    type: Number,
    description: '是否管理员  1是 0不是',
  })
  @IsOptional()
  @IsNumber()
  readonly ifManager?: number;

  @ApiPropertyOptional({ type: Number, description: '状态 1正常 0禁用' })
  @IsOptional()
  @IsNumber()
  readonly status?: number;

  @ApiPropertyOptional({ type: String, description: '备注' })
  @IsOptional()
  @IsString()
  readonly remark?: string;

  @ApiPropertyOptional({
    type: Number,
    description: '是否删除 1删除 0未删除',
  })
  @IsOptional()
  @IsNumber()
  readonly isDelete?: number;
}

export class UpdateUserDto extends CreateUserDto {
  @ApiProperty({ type: Number, description: '用户id' })
  @IsNotEmpty({ message: '用户id不能为空' })
  @IsNumber()
  readonly id: number;
}

export class UpdatePassWordDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty({ message: '新密码不能为空' })
  readonly newPassword: string;
}

export class DeployRoleDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: '用户id不能为空' })
  @IsNumber()
  readonly id: number;

  @ApiProperty({ type: String })
  @IsNumber()
  @IsNotEmpty({ message: '角色不能为空' })
  readonly roles: string;
}

export class QueryUserDto extends QueryOptionsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly username: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly account: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly mobile: string;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  readonly status: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  readonly ifManage: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  readonly ifDelete: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly created: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly updated: string;
}

export class changePwdDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: '用户id不能为空' })
  @IsNumber()
  readonly id: number;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: '新密码不能为空' })
  @IsString()
  readonly password: string;
}

export class FindByIdDto {
  @ApiProperty({
    description: '需要查找的用户ID',
  })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  id: number;
}
