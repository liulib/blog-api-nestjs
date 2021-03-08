/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-12-04 09:04:05
 * @LastEditors  : liulib
 * @LastEditTime : 2020-12-04 10:12:45
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局注册错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 全局使用管道
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000, () => {
    Logger.log('服务已经启动,请访问localhost:3000');
  });
}
bootstrap();
