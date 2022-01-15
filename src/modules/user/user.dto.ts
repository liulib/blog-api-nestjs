import {
  IsNotEmpty,
  Length,
  IsString,
  IsOptional,
  IsNumber,
  IsInt,
  Min,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { QueryOptionsDto } from '@/common/dto/queryOptionDto';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ type: String, description: '用户名', required: true })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString()
  readonly username: string;

  @ApiProperty({
    type: String,
    description: '用户账号 长度6-30',
    required: true,
  })
  @IsNotEmpty({ message: '用户账号不能为空' })
  @Length(6, 30)
  @IsString()
  readonly account: string;

  @ApiProperty({
    type: String,
    description: '密码 长度6-30',
    required: true,
  })
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 30)
  @IsString()
  readonly password: string;

  @ApiProperty({
    type: String,
    description: '角色id字符串以,拼接 示例1,2,3,4,5',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly roles: string;

  @ApiProperty({
    type: String,
    description: '邮箱',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly email: string;

  @ApiProperty({ type: String, description: '手机号', required: false })
  @IsOptional()
  @IsString()
  readonly mobile: string;

  @ApiProperty({
    type: Number,
    description: '是否管理员  1是 0不是',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  readonly ifManager: number;

  @ApiProperty({
    type: Number,
    description: '状态 1正常 0禁用',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty({ message: '用户状态不能为空' })
  readonly status: number;

  @ApiProperty({ type: String, description: '备注', required: false })
  @IsOptional()
  @IsString()
  readonly remark: string;

  @ApiProperty({
    type: Number,
    description: '是否删除 1删除 0未删除',
    required: true,
  })
  @IsNotEmpty({ message: '是否删除不能为空' })
  @IsNumber()
  readonly isDelete: number;
}

export class UpdateUserDto {
  @ApiProperty({ type: Number, description: '用户id', required: true })
  @IsNotEmpty({ message: '用户id不能为空' })
  @IsNumber()
  readonly id: number;

  @ApiProperty({
    type: String,
    description: '用户名',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly username: string;

  @ApiProperty({
    type: String,
    description: '邮箱',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly email: string;

  @ApiProperty({
    type: String,
    description: '手机号',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly mobile: string;

  @ApiProperty({
    type: Number,
    description: '是否管理员  1是 0不是',
    required: true,
  })
  @IsNotEmpty({ message: '是否是管理员不能为空' })
  @IsNumber()
  readonly ifManager: number;

  @ApiProperty({
    type: Number,
    description: '状态 1正常 0禁用',
    required: true,
  })
  @IsNotEmpty({ message: '状态不能为空' })
  @IsNumber()
  readonly status: number;

  @ApiProperty({
    type: String,
    description: '备注',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly remark?: string;

  @ApiProperty({
    type: Number,
    description: '是否删除 1删除 0未删除',
    required: true,
  })
  @IsNotEmpty({ message: '是否删除不能为空' })
  @IsNumber()
  readonly isDelete: number;

  @ApiProperty({
    type: String,
    description: '角色id字符串以,拼接 示例1,2,3,4,5',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly roles?: string;
}

export class UpdatePassWordDto {
  @ApiProperty({
    type: String,
    description: '密码',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;

  @ApiProperty({ type: String, description: '新密码', required: true })
  @IsString()
  @IsNotEmpty({ message: '新密码不能为空' })
  readonly newPassword: string;
}

export class DeployRoleDto {
  @ApiProperty({ type: Number, description: '用户id', required: true })
  @IsNotEmpty({ message: '用户id不能为空' })
  @IsNumber()
  readonly id: number;

  @ApiProperty({ type: String, description: '角色', required: true })
  @IsNumber()
  @IsNotEmpty({ message: '角色不能为空' })
  readonly roles: string;
}

export class QueryUserDto extends QueryOptionsDto {
  @ApiProperty({ type: String, description: '用户名', required: false })
  @IsOptional()
  @IsString()
  readonly username: string;

  @ApiProperty({
    type: String,
    description: '用户账号',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly account: string;

  @ApiProperty({ type: String, description: '手机号', required: false })
  @IsOptional()
  @IsString()
  readonly mobile: string;

  @ApiProperty({
    type: String,
    description: '状态 1正常 0禁用',
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  readonly status: number;

  @ApiProperty({
    type: Number,
    description: '是否管理员  1是 0不是',
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  readonly ifManage: number;

  @ApiProperty({
    type: Number,
    description: '是否删除 1删除 0未删除',
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  readonly ifDelete: number;

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
    description: '更新时间',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly updated: string;
}

export class changePwdDto {
  @ApiProperty({
    type: Number,
    description: '用户id',
    required: true,
  })
  @IsNotEmpty({ message: '用户id不能为空' })
  @IsNumber()
  readonly id: number;

  @ApiProperty({ type: String, description: '新密码', required: true })
  @IsNotEmpty({ message: '新密码不能为空' })
  @IsString()
  readonly password: string;
}

export class FindByIdDto {
  @ApiProperty({
    type: Number,
    description: '需要查找的用户ID',
    required: true,
  })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  id: number;
}
