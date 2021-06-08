/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-11-28 11:55:55
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2021-06-08 10:52:08
 */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { MenuModule } from './modules/menu/menu.module';
import { AuthModule } from './modules/auth/auth.module';
import { ArticleModule } from './modules/article/article.module';
import { CategoryModule } from './modules/category/category.module';
import { CommentModule } from './modules/comment/comment.module';
import { TagModule } from './modules/tag/tag.module';
import { IpModule } from './modules/ip/ip.module';
import customConfig from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 作用于全局
      load: [customConfig], // 加载自定义配置项
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // 数据库配置项依赖于ConfigModule，需在此引入
      useFactory: (configService: ConfigService) =>
        configService.get('DATABASE_CONFIG'),
      inject: [ConfigService], // 记得注入服务，不然useFactory函数中获取不到ConfigService
    }),
    UserModule,
    RoleModule,
    MenuModule,
    AuthModule,
    ArticleModule,
    CategoryModule,
    CommentModule,
    TagModule,
    IpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
