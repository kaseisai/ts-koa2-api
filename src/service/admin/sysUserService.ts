import { SysUserDao } from '../../repository/mysql/dao/sysuser';
import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';
import { defaultRedis } from '../../common/redisHelper';
import { CacheExpireTime } from '../../consts/cache-keys';

export class SysUserService {
  static current = new SysUserService();
  private secret = '189004023757124';
  constructor() {}

  async validateUser(username: string, password: string) {
    const user = await SysUserDao.current.findOne({ username });
    if (user != null) {
      if (bcrypt.compareSync(password, user.password)) {
        delete user.password;
        return user;
      }
    }

    return null;
  }

  generateToken(payload: { userId: number; username: string }) {
    const token = jwt.sign(payload, this.secret, { expiresIn: '365d' });
    defaultRedis.set(token, JSON.stringify(payload), 'EX', 60 * 60 * 24 * 360);
    return token;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new Error('用户名或密码错误');
    }
    const payload = {
      userId: user.id,
      username: user.username,
    };

    return {
      userId: user.id,
      username: user.username,
      accessToken: this.generateToken(payload),
    };
  }

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }
}
