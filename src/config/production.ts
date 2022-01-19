import { join } from 'path';
import { IConfig } from './index';

const config: IConfig = {
  // 端口
  port: parseInt(process.env.PORT, 10) || 3000,
  // 是否开启swagger
  enableSwagger: false,
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
  GITHUB_OAUTH2: {
    client_id: '8cfd838ae6ab49046df7',
    client_secret: 'f4eafb9dc2c083185461ca861c438be94896d97a',
    access_token_url: 'https://github.com/login/oauth/access_token',
    fetch_user_url: 'https://api.github.com/user',
  },
};

export default config;
