/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-12-02 09:12:27
 * @LastEditors  : liulib
 * @LastEditTime : 2020-12-02 09:38:57
 */
import developmentConfig from './development';
import productionConfig from './production';

const configs = {
  development: developmentConfig,
  production: productionConfig,
};
const env = process.env.NODE_ENV || 'development';

export default () => configs[env];
