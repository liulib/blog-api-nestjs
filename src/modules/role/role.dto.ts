/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2021-01-04 14:09:44
 * @LastEditors  : liulib
 * @LastEditTime : 2021-03-08 15:22:37
 */
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'roleName不能为空' })
  readonly roleName: string;
  @IsNumber()
  @IsOptional()
  readonly remark?: string;
  @IsNotEmpty({ message: 'isDelete不能为空' })
  @IsNumber()
  readonly isDelete: number;
}

export class UpdateRoleDto {
  @IsNotEmpty({ message: 'id不能为空' })
  readonly id: number;
  @IsNotEmpty({ message: 'roleName不能为空' })
  @IsString()
  readonly roleName: string;
  @IsString()
  @IsOptional()
  readonly remark?: string;
  @IsNotEmpty({ message: 'isDelete不能为空' })
  @IsNumber()
  readonly isDelete: number;
}

export class QueryRoleDto {
  @IsNotEmpty({ message: 'pageNumber不能为空' })
  readonly pageNumber: number;
  @IsNotEmpty({ message: 'pageSize不能为空' })
  readonly pageSize: number;
  @IsOptional()
  @IsString()
  readonly roleName?: string;
  @IsOptional()
  @IsNumber()
  readonly isDelete?: number;
  @IsOptional()
  @IsString()
  readonly created?: string;
  @IsOptional()
  @IsString()
  readonly updated?: string;
}

export class DeployMenuDto {
  @IsNotEmpty({ message: '用户id不能为空' })
  readonly id: number;
  @IsString({ message: 'menus必须为string' })
  readonly menus: string;
}
