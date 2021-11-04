import { join } from 'path';
export default {
  // 端口
  port: parseInt(process.env.PORT, 10) || 3000,
  // 是否开启swagger
  enableSwagger: true,
  // 数据库配置
  DATABASE_CONFIG: {
    type: 'mysql',
    host: 'mysql',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'blog-nestjs',
    timezone: 'UTC',
    charset: 'utf8mb4',
    entities: [join(__dirname, '../', '**/**.entity{.js,.ts}')],
    synchronize: true,
    logging: true,
  },
};
