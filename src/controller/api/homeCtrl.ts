import Koa from 'koa';

import { route, HttpMethod } from '../../common';

export class HomeCtrl {
  @route(HttpMethod.GET, '/')
  async home(ctx: Koa.Context) {
    ctx.sendApiRes();
  }
}
