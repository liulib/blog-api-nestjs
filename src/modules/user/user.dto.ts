/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2021-01-04 14:07:36
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2021-04-21 11:32:40
 */
import {
  IsNotEmpty,
  Length,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(6, 30)
  @IsString()
  readonly username: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: '用户账号不能为空' })
  @IsString()
  readonly account: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 30)
  @IsString()
  readonly password: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  readonly roles: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  readonly email?: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  readonly mobile?: string;

  @ApiPropertyOptional({
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  readonly ifManager?: number;

  @ApiPropertyOptional({
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  readonly status?: number;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  readonly remark?: string;

  @ApiPropertyOptional({
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  readonly isDelete?: number;
}

export class UpdateUserDto {
  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty({ message: '用户id不能为空' })
  @IsNumber()
  readonly id: number;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  readonly email?: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  readonly mobile?: string;

  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty({ message: '是否是管理员不能为空' })
  @IsNumber()
  readonly ifManager: number;

  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty({ message: '状态不能为空' })
  @IsNumber()
  readonly status: number;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  readonly remark?: string;

  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty({ message: '是否删除不能为空' })
  @IsNumber()
  readonly isDelete: number;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  readonly roles?: string;
}

export class UpdatePassWordDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: '新密码不能为空' })
  readonly newPassword: string;
}

export class DeployRoleDto {
  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty({ message: '用户id不能为空' })
  @IsNumber()
  readonly id: number;

  @ApiProperty({
    type: String,
  })
  @IsNumber()
  @IsNotEmpty({ message: '角色不能为空' })
  readonly roles: string;
}

export class QueryUserDto {
  @ApiProperty({ description: '页码' })
  @IsNotEmpty({ message: 'page不能为空' })
  readonly page: number;

  @ApiProperty({ description: '每页显示多少条' })
  @IsNotEmpty({ message: 'pageSize不能为空' })
  readonly pageSize: number;

  @ApiPropertyOptional()
  @IsOptional()
  readonly username?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly account?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly mobile?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly ifManage?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly ifDelete?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly created?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly updated?: string;
}

export class changePwdDto {
  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty({ message: '用户id不能为空' })
  @IsNumber()
  readonly id: number;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: '新密码不能为空' })
  @IsString()
  readonly password: string;
}
