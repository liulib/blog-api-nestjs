import developmentConfig from './development';
import productionConfig from './production';

export interface IConfig {
  port: number;
  enableSwagger: boolean;
  DATABASE_CONFIG: any;
  GITHUB_OAUTH2: any;
}

const configs = {
  development: developmentConfig,
  production: productionConfig,
};

const env = process.env.NODE_ENV || 'development';

const getConfig: () => IConfig = () => configs[env];

export default getConfig;
