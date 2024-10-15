import Redis from 'ioredis';
import { websiteConfig } from './configManager';
import { isProduction } from './utils/env';

export enum RedisDB {
  Default = 0,
  Cron = 2,
}

export enum RedisWebsite {
  'default' = RedisDB.Default,
  'cron' = RedisDB.Cron,
}

export class RedisHelper {
  private static instance: RedisHelper | null = null;
  private redisClient: Redis;

  constructor(redisStoreNum: number) {
    const redisConfig = websiteConfig.redis;
    this.redisClient = new Redis({
      ...redisConfig,
      db: redisStoreNum,
    });
  }

  client() {
    return this.redisClient;
  }

  // 单例模式是为同一套代码，在不同的网站上请求时，获取不同的数据库；在中间件中会每一次都会执行初始化，单例用于解决该问题
  static getInstance(redisStoreNum: number = RedisDB.Default): RedisHelper {
    const instance = RedisHelper.instance;
    if (!instance) {
      RedisHelper.instance = new RedisHelper(redisStoreNum);
    }

    return RedisHelper.instance;
  }

  // set<T>(key: string, value: T) {
  //   if (value instanceof Object) {
  //     value = <any>JSON.stringify(value);
  //   }

  //   return new Promise<string>((resolve: any, reject) => {
  //     this.redisClient.set(key, <any>value, (err, reply) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(reply);
  //       }
  //     });
  //   });
  // }

  setex<T>(key: string, value: T, expireTime = 86400) {
    if (value instanceof Object) {
      value = <any>JSON.stringify(value);
    }

    return new Promise<string>((resolve: any, reject) => {
      this.redisClient.setex(key, expireTime, <any>value, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  // get<T extends any>(key: string): Promise<T> {
  //   return new Promise((resolve: any, reject) => {
  //     this.redisClient.get(key, (err, reply) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         try {
  //           if (!reply) {
  //             resolve(undefined);
  //           } else {
  //             const r = JSON.parse(reply);
  //             resolve(r);
  //           }
  //         } catch (error) {
  //           resolve(<any>reply);
  //         }
  //       }
  //     });
  //   });
  // }

  keys(key: string): Promise<string[]> {
    return new Promise((resolve: any, reject) => {
      this.redisClient.keys(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  lrange(key: string, start: number, stop: number): Promise<string[]> {
    return new Promise((resolve: any, reject) => {
      this.redisClient.lrange(key, start, stop, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  delete(key: string) {
    this.redisClient.del(key);
  }

  // forEach(fn) {
  //   this.redisClient.keys('*', async (err, reply) => {
  //     if (reply) {
  //       for (const key of reply) {
  //         const value = await this.get(key);
  //         fn(key, value);
  //       }
  //     }
  //   });
  // }
}

export const defaultRedis = RedisHelper.getInstance(websiteConfig.redis.db).client();
export const cronRedis = RedisHelper.getInstance(RedisDB.Cron).client();

export async function getOrSetStringCache(key: string, value?: string, time = 60 * 60 * 4) {
  // global.logger.info(`getOrSetStringCache cache key--->, ${key}, ${value ? 'set' : 'get'} operation`);
  if (!isProduction) {
    return;
  }
  if (value) {
    await defaultRedis.set(key, value, 'EX', time);
    return;
  }
  return await defaultRedis.get(key);
}
