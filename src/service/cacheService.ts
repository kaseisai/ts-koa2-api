import { RedisDB, cronRedis, defaultRedis } from '../common/redisHelper';
import Redis from 'ioredis';

const redisMap: Record<RedisDB, any> = {
  [RedisDB.Default]: defaultRedis,
  [RedisDB.Cron]: cronRedis,
};

export class CacheService {
  static current: CacheService = new CacheService();
  private redisDB: RedisDB;
  private redisClient: Redis;

  constructor(redisDB?: number) {
    this.redisDB = redisDB || RedisDB.Default;
    this.redisClient = redisMap[this.redisDB];
  }

  async flushDB() {
    await this.redisClient.flushdb();
  }

  async clearAllModuleCache(moduleKeyPre: string) {
    const [cursor, keys] = await this.redisClient.scan(0, 'MATCH', `${moduleKeyPre}*`, 'COUNT', 60000);
    if (keys && keys.length) {
      global.logger.info({ msg: '总共匹配到多少key===>', data: keys.length });
      for (let k of keys) {
        await this.redisClient.del(k);
      }
    }
  }
}
