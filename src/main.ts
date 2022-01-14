import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import customConfig from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 允许cors
  app.enableCors();
  // 全局注册错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 全局使用管道
  app.useGlobalPipes(new ValidationPipe());

  // 配置swagger文档
  if (customConfig().enableSwagger) {
    const options = new DocumentBuilder()
      .setTitle('blog文档')
      .setVersion('1.0')
      .addTag(
        'HTTP状态码正常处理 401未认证 403无权  返回数据中code为1表示业务正常 code为0表示业务异常',
      )
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('doc', app, document);
  }

  await app.listen(customConfig().port, () => {
    Logger.log(`服务已经启动,请访问http://127.0.0.1:${customConfig().port}/`);
  });
}
bootstrap();
