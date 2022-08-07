import 'dotenv/config';

export const authConfig = {
  secretKey: process.env.JWT_ACCESS_SECRET_KEY,
  expireTime: process.env.JWT_ACCESS_EXPIRE_TIME,
  refreshSecretKey: process.env.JWT_SECRET_REFRESH_KEY,
  refreshExpireTime: process.env.JWT_REFRESH_EXPIRE_TIME,
};
