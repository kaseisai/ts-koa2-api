import { randomInt } from 'crypto';
import { defaultRedis } from '../redisHelper';
import { CacheExpireTime } from '../../consts/cache-keys';

export class VerificationCodeManager {
  static current: VerificationCodeManager = new VerificationCodeManager();

  constructor() {}

  async genCode(mobile: string): Promise<string> {
    const value = randomInt(100000, 1000000);
    const code = value.toString();

    global.logger.info({ msg: 'genCode===>', data: { mobile, code } });

    await defaultRedis.set(mobile, code, 'EX', CacheExpireTime);
    return code;
  }

  async verifyCode(mobile: string, code: string): Promise<boolean> {
    const cacheCode = await defaultRedis.get(mobile);
    global.logger.info({ msg: 'verifyCode===>', data: { mobile, code, cacheCode } });
    if (cacheCode !== code) {
      return false;
    }

    return true;
  }
}
