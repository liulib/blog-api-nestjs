/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2021-01-27 23:19:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-16 22:18:43
 */
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class LoginDto {
  @ApiProperty({ type: String, description: '用户账号', required: true })
  @IsNotEmpty({ message: '用户账号不能为空' })
  @IsString()
  readonly account: string;

  @ApiProperty({ type: String, description: '用户密码', required: true })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString()
  readonly password: string;
}

class GithubLoginDto {
  @ApiProperty({
    type: String,
    description: 'github返回的code',
    required: true,
  })
  @IsNotEmpty({ message: 'code不能为空' })
  @IsString()
  code: string;
}

export { LoginDto, GithubLoginDto };
