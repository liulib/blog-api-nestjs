/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2021-01-04 14:07:36
 * @LastEditors  : liulib
 * @LastEditTime : 2021-03-08 16:28:14
 */
import { IsNotEmpty, Length, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'username不能为空' })
  @Length(6, 30)
  readonly username: string;

  @IsNotEmpty({ message: 'password不能为空' })
  @Length(6, 30)
  password: string;

  readonly email: string;
  readonly mobile: string;
  readonly ifManager: number;
  readonly status: number;
  readonly remark: string;
  readonly isDelete: number;
}

export class UpdatePassWordDto {
  @IsNotEmpty({ message: 'password不能为空' })
  readonly password: string;

  @IsNotEmpty({ message: 'newPassword不能为空' })
  readonly newPassword: string;
}

export class DeployRoleDto {
  @IsNotEmpty({ message: '用户id不能为空' })
  readonly id: number;

  @IsString({ message: 'roles必须为string' })
  readonly roles: string;
}

export class QueryUserDto {
  @IsNotEmpty({ message: 'pageNumber不能为空' })
  readonly pageNumber: number;
  @IsNotEmpty({ message: 'pageSize不能为空' })
  readonly pageSize: number;
  readonly username?: string;
  readonly mobile?: string;
  readonly status?: number;
  readonly ifManage?: number;
  readonly ifDelete?: number;
  readonly created?: string;
  readonly updated?: string;
}

export class changePwdDto {
  @IsNotEmpty({ message: '用户id不能为空' })
  readonly id: number;
  @IsNotEmpty({ message: '新密码不能为空' })
  readonly password: string;
}
