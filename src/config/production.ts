/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-12-02 09:36:13
 * @LastEditors  : liulib
 * @LastEditTime : 2021-03-08 16:45:21
 */
export default {
  // 端口
  port: parseInt(process.env.PORT, 10) || 3000,
  // 是否开启swagger
  enableSwagger: true,
  // 数据库配置
  DATABASE_CONFIG: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'blog-nestjs',
    timezone: 'UTC',
    charset: 'utf8mb4',
    entities: ['./**/*.entity.js'],
    synchronize: true,
    logging: true,
  },
};
