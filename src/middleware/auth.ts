import Koa from 'koa';

import { AuthException } from '../common';
import { baseConfig } from '../common/configManager';
import { ApiKeyException } from '../common/exception/apiKeyException';
import { defaultRedis } from '../common/redisHelper';
import { getEnv } from '../common/utils/env';

/**
 * 添加辅助方法
 * @param app
 */
export async function addApiMethods(ctx: Koa.Context, next: Function) {
  if (ctx.sendApiRes) {
    return await next();
  }

  ctx.sendApiRes = (result: any, code?: number) => {
    result || (result = {});
    if (result && result.code && result.message) {
      ctx.response.body = result;
    } else {
      ctx.response.body = {
        code: code || 0,
        message: 'success',
        data: result,
      };
    }
  };

  await next();
}

export async function formatQueryData(ctx: Koa.Context, next: Function) {
  if (ctx.query) {
    const l = [];
    for (const key in ctx.query) {
      if (key.indexOf('_') > -1) {
        const tmp = key.split('_');
        ctx.query[`${tmp[0]}QueryParams`] || (ctx.query[`${tmp[0]}QueryParams`] = {} as any);
        ctx.query[`${tmp[0]}QueryParams`][tmp[1]] = ctx.query[key];
        l.push(key);
      }
    }

    for (const key of l) {
      delete ctx.query[key];
    }
  }
  await next();
}

function getTokenByHeaders(ctx: Koa.Context) {
  let token: string = ctx.cookies.get('token');
  const { authorization } = ctx.headers;
  if (!token && authorization) {
    token = authorization.replace('Bearer', '').trim();
  }
  if (!token) {
    throw new AuthException();
  }
  return token;
}

export async function setDomain(ctx: Koa.Context, next: Function) {
  let domain = (ctx.headers.domain as string) || 'oe1';
  ctx.domain = domain;
  global.domain = domain;
  await next();
}

export async function ApiKeyGuard(ctx: Koa.Context, next: Function) {
  const reqKey = ctx.request.headers['x-api-key'];
  if (reqKey !== baseConfig.xApiKey) {
    throw new ApiKeyException();
  }
  await next();
}

export async function jwtAuthGuard(ctx: Koa.Context, next: Function) {
  if (getEnv === 'development') {
    // await next();
    // return;
  }

  const token = getTokenByHeaders(ctx);
  const payload = await defaultRedis.get(token);
  if (!payload) {
    ctx.body = {
      code: 401,
      message: '登录过期',
    };
    return;
  }
  ctx.user = JSON.parse(payload);
  console.log('user--->', ctx.user);
  await next();
}
