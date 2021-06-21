/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2021-01-27 23:19:28
 * @LastEditors  : liulib
 * @LastEditTime : 2021-04-02 15:27:25
 */
import { IsNotEmpty, IsString } from 'class-validator';

class LoginDto {
  @IsNotEmpty({ message: '用户账号不能为空' })
  @IsString()
  readonly account: string;
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString()
  readonly password: string;
}

export { LoginDto };
