/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2021-01-04 14:18:38
 * @LastEditors  : liulib
 * @LastEditTime : 2021-03-08 15:13:45
 */
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateMenuDto {
  @IsNumber()
  @IsOptional()
  readonly parentId?: number;
  @IsNotEmpty({ message: '菜单名不能为空' })
  @IsString()
  readonly menuName: string;
  @IsNotEmpty({ message: '菜单类型不能为空' })
  @IsNumber()
  readonly menuType: number;
  @IsNumber()
  @IsOptional()
  readonly status?: number;
  @IsString()
  @IsOptional()
  readonly url?: string;
  @IsString()
  @IsOptional()
  readonly perms?: string;
  @IsString()
  @IsOptional()
  readonly remark?: string;
  @IsNumber()
  @IsOptional()
  readonly isDelete?: number;
}

export class UpdateMenuDto {
  @IsNumber()
  @IsNotEmpty({ message: '菜单ID不能为空' })
  readonly id: number;
  @IsNumber()
  @IsOptional()
  readonly parentId?: number;
  @IsNotEmpty({ message: '菜单名不能为空' })
  @IsString()
  readonly menuName: string;
  @IsNotEmpty({ message: '菜单类型不能为空' })
  @IsNumber()
  readonly menuType: number;
  @IsNumber()
  @IsOptional()
  readonly status?: number;
  @IsString()
  @IsOptional()
  readonly url?: string;
  @IsString()
  @IsOptional()
  readonly perms?: string;
  @IsString()
  @IsOptional()
  readonly remark?: string;
  @IsNumber()
  @IsOptional()
  readonly isDelete?: number;
}
