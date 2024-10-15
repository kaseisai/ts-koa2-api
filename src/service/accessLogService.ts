import fs from 'fs';
import moment from 'moment';

import { baseConfig } from '../common/configManager';
import { AccessIpDao } from '../repository/mysql/dao/accessIp';
import { IpType } from '../repository/mysql/models/AccessIp';
import { defaultRedis } from '../common/redisHelper';

interface AccessLog {
  realIp: string;
  time: string;
  request: string;
  reqBody: string;
  status: string;
  size: number;
  ua: string;
  cookie: string;
  reqTime?: string;
  xff?: string;
  upsStatus?: string;
  upsTime?: string;
}

/**
 * 解析nginx产生的access log，识别非法的访问请求
 */
export class AccessLogService {
  static current: AccessLogService = new AccessLogService();

  private accessLogPath = baseConfig.accessLogPath;
  private readonly minutesAccessLimit = 30; // 访问限制30次，超过该值则访问ip将被拒绝访问
  private readonly startTime = moment().subtract(3, 'm').format('YYYY-MM-DD HH:mm');
  private readonly endTime = moment().format('YYYY-MM-DD HH:mm');

  constructor(accessLogPath?: string) {
    if (accessLogPath) {
      this.accessLogPath = accessLogPath;
    }
  }

  async start() {
    try {
      const log = fs.readFileSync(this.accessLogPath, 'utf-8');
      await this.parse(log);
    } catch (error) {
      global.logger.info({ msg: 'start job error>>>>>', error });
    }
  }

  async parse(log: string) {
    const lines = log.split('\n');
    let ipAccessMap = new Map();

    for (let v in lines) {
      try {
        if (!lines[v]) {
          continue;
        }
        const log: AccessLog = JSON.parse(lines[v]);
        if (!log.realIp) {
          continue;
        }

        if (await this.checkWhiteIp(log.realIp)) {
          continue;
        }
        await this.accessStatistics(log, ipAccessMap);

        await this.accessCheck(ipAccessMap);
      } catch (error) {
        console.error('遍历处理数据出错===>', error);
      }
    }
    await this.generateBlackListIp();
  }

  private async accessCheck(ipAccessMap: Map<string, any>) {
    for (let i of ipAccessMap) {
      const key = i[0];
      const value = i[1];
      if (value.ipAccessNumber >= this.minutesAccessLimit) {
        // 超过限制，加入可疑列表
        await AccessIpDao.current.findOrCreate(
          {
            ip: key,
            type: IpType.Black,
          },
          {
            ip: key,
            type: IpType.Black,
            log: JSON.stringify(value),
          },
        );
      }
    }
  }

  /**
   * 检查某段时间内有多少ip访问，访问的总次数
   * @param accessLog
   */
  private async accessStatistics(accessLog: AccessLog, ipAccessMap: Map<string, any>) {
    if (!moment(accessLog.time).isBetween(this.startTime, this.endTime)) {
      global.logger.info('not start end time');
      return;
    }

    let ipAccessLog: any = ipAccessMap.get(accessLog.realIp);
    if (ipAccessLog) {
      ipAccessLog.ipAccessNumber = ipAccessLog.ipAccessNumber++;
    } else {
      ipAccessLog = { ...accessLog, ipAccessNumber: 1 };
    }

    ipAccessMap.set(accessLog.realIp, ipAccessLog);
  }

  // 检查ip白名单
  private async checkWhiteIp(ip: string): Promise<boolean> {
    const accessIp = await AccessIpDao.current.findOne({
      ip,
      type: IpType.White,
    });

    return !!accessIp;
  }

  private async generateBlackListIp() {
    const blackListIp = await AccessIpDao.current.findAll(
      {
        type: IpType.Black,
      },
      {
        attributes: ['ip'],
        raw: true,
      },
    );
    if (!blackListIp.length) {
      return;
    }
    let ips = blackListIp.map((value: any) => value.ip);
    await defaultRedis.set('black-list-ip', JSON.stringify(ips));
  }
}
