import Koa from 'koa';

import { HttpMethod, route } from '../../common';
import { jwtAuthGuard } from '../../middleware/auth';
import { SystemConfigDao } from '../../repository/mysql/dao/systemConfig';

export class SysConfigController {
  @route(HttpMethod.POST, '/nbatyw/system-config', jwtAuthGuard)
  async editSystemConfig(ctx: Koa.Context) {
    let { name, value } = ctx.request.body as any;
    const res = await SystemConfigDao.current.findOne({ name });
    if (!res) {
      await SystemConfigDao.current.create({ name, value });
    } else {
      await SystemConfigDao.current.update(
        {
          value,
        },
        {
          id: res.id,
        },
      );
    }
    ctx.sendApiRes();
  }

  @route(HttpMethod.GET, '/nbatyw/system-config/:name')
  async getSystemConfig(ctx: Koa.Context) {
    const { name } = ctx.params;
    let systemConfig = await SystemConfigDao.current.findOne({ name });
    const res = systemConfig ? JSON.parse(systemConfig.value) : {};
    ctx.sendApiRes(res);
  }
}
