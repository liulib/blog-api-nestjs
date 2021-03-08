/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2021-01-28 23:52:23
 * @LastEditors  : liulib
 * @LastEditTime : 2021-01-30 12:44:36
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
