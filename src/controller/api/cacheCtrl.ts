import Koa from 'koa';
import Joi from 'joi';

import { route, HttpMethod } from '../../common';
import { CacheService } from '../../service/cacheService';
import { RedisDB } from '../../common/redisHelper';
import { validateParams } from '../../middleware/validateParams';

export enum CacheClearType {
  All = 'all',
  Product = 'product',
}

export const cacheClearSchema = Joi.object({
  type: Joi.string()
    .required()
    .valid(...Object.values(CacheClearType)),
  redisDB: Joi.number()
    .required()
    .valid(...Object.values(RedisDB)),
});

export class CacheCtrl {
  @route(HttpMethod.POST, '/api/cache/clear', validateParams(cacheClearSchema))
  async clearCache(ctx: Koa.Context) {
    const { type, redisDB } = ctx.request.body as any;
    const cacheService = new CacheService(redisDB);

    switch (type) {
      case CacheClearType.All:
        await cacheService.flushDB();
        break;
      default:
        break;
    }
    ctx.sendApiRes();
  }
}
