import * as Koa from 'koa';
import { HttpMethod, route } from '../../common';
import { ApiKeyGuard } from '../../middleware';
import { CheckAccessIpService } from '../../service/checkAccessIpService';
import { ErrorCode, code2Text } from '../../common/errorCode/code';

export class CheckAccessIpController {
  @route(HttpMethod.POST, '/nbatyw/mp/check-access-ip', ApiKeyGuard)
  async query(ctx: Koa.Context) {
    let { ip, ua } = ctx.request.body as any;
    if (!ip || !ua) {
      ctx.body = {
        code: ErrorCode.WEBParamsError,
        message: code2Text(ErrorCode.WEBParamsError),
        data: {},
      };
      return;
    }
    let ipParts = ip.split('.');
    ipParts[3] = '*';
    ip = ipParts.join('.');
    const checkAccessIpSrv = new CheckAccessIpService(ip, ua);
    const isAccessIp = await checkAccessIpSrv.checkAccessIpIsAccessIp();
    ctx.sendApiRes({ isAccessIp });
  }
}
