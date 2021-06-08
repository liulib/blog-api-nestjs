/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2021-01-04 14:09:44
 * @LastEditors  : liulib
 * @LastEditTime : 2021-04-01 13:39:51
 */
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty({ message: '角色名不能为空' })
  readonly roleName: string;
  @IsString()
  @IsOptional()
  readonly remark?: string;
  @IsOptional()
  @IsNumber()
  readonly isDelete?: number;
}

export class UpdateRoleDto {
  @IsNotEmpty({ message: '角色id不能为空' })
  @IsNumber()
  readonly id: number;
  @IsNotEmpty({ message: '角色名不能为空' })
  @IsString()
  readonly roleName: string;
  @IsString()
  @IsOptional()
  readonly remark?: string;
  @IsNotEmpty({ message: '是否删除不能为空' })
  @IsNumber()
  readonly isDelete: number;
}

export class QueryRoleDto {
  @IsNotEmpty({ message: 'page不能为空' })
  @IsString()
  readonly page: string;
  @IsNotEmpty({ message: 'pageSize不能为空' })
  @IsString()
  readonly pageSize: string;
  @IsOptional()
  @IsString()
  readonly roleName?: string;
  @IsOptional()
  @IsString()
  readonly isDelete?: string;
  @IsOptional()
  @IsString()
  readonly created?: string;
  @IsOptional()
  @IsString()
  readonly updated?: string;
}

export class DeployMenuDto {
  @IsNotEmpty({ message: '用户id不能为空' })
  @IsNumber()
  readonly id: number;
  @IsOptional()
  @IsString()
  readonly menus?: string;
}
