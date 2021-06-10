import * as bcrypt from 'bcrypt';

const saltRounds = 10;

/**
 * @description: 对密码进行加密
 * @param {string} password 密码
 * @return {string} 加密后的密码
 */
const hashPassword = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
};

/**
 * @description: 校验密码
 * @param {string} password 需要校验的密码
 * @param {string} hash 加密后的密码
 * @return {boolean} 是否通过校验
 */
const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

export { hashPassword, comparePassword };
