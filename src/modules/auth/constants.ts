import * as dotenv from 'dotenv';

// 加载环境变量
dotenv.config();
export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};
