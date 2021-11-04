import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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
  const options = new DocumentBuilder()
    .setTitle('blog文档')
    .setVersion('1.0')
    .addTag('blog1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(9002, () => {
    Logger.log('服务已经启动,请访问http://127.0.0.1:9002/');
  });
}
bootstrap();
