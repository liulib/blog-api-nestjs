/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-12-04 09:49:03
 * @LastEditors  : liulib
 * @LastEditTime : 2021-03-08 10:30:38
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();

    const message = exception['response'];
    const errorResponse = {
      code: message.statusCode,
      message: message.message,
      data: {
        error: message,
      }, // 获取全部的错误信息
      // url: request.originalUrl, // 错误的url地址
    };
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
