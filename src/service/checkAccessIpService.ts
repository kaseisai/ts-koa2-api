import moment from 'moment';
import { AccessIpDao } from '../repository/mysql/dao/accessIp';
import { IpType } from '../repository/mysql/models/AccessIp';
import { defaultRedis } from '../common/redisHelper';
import { CacheExpireTime } from '../consts/cache-keys';

export class CheckAccessIpService {
  private readonly minutesAccessLimit = 30; // 访问限制30次，超过该值则访问ip将被拒绝访问
  private min = 2; // 计算几分钟内的ip数
  private uaArr = [
    'bingbot/2.0; +http://www.bing.com/bingbot.htm',
    'Baiduspider-render/2.0; +http://www.baidu.com/search/spider.html',
    'Googlebot/2.1; +http://www.google.com/bot.html',
  ];
  private blackUaArr = ['PetalBot;+https://webmaster.petalsearch.com/site/petalbot', 'SkyworkSpider'];
  private ip: string;
  private ua: string | null = null;

  constructor(ip: string, ua: string) {
    this.ip = ip;
    this.ua = ua;
  }

  async checkAccessIpIsAccessIp() {
    const isAccessUA = this.checkUA();
    if (isAccessUA) {
      return true;
    }

    const isBlackAccessUA = this.checkBlackUA();
    if (isBlackAccessUA) {
      return false;
    }

    const accessIp = await this.getAccessIpType();
    if (accessIp && accessIp.type === IpType.Black) {
      return false;
    } else if (accessIp && accessIp.type === IpType.White) {
      return true;
    }

    // 往当前的时间分钟里写入缓存ip
    await this.setIpCacheForNow();

    // 检查是否在时间限制内，超出访问次数
    const ipFrequencyCount = await this.getIpFrequencyCount();
    if (ipFrequencyCount >= this.minutesAccessLimit) {
      AccessIpDao.current.findOrCreate(
        {
          ip: this.ip,
          type: IpType.Black,
        },
        {
          ip: this.ip,
          type: IpType.Black,
          ua: this.ua,
        },
      );
      return false;
    }
    return true;
  }

  private async getIpFrequencyCount() {
    const minuteIntervals = this.getMinuteIntervals();
    let allIp = [];
    for (const m of minuteIntervals) {
      const time = m.format('YYYY-MM-DD HH:mm');
      const ipCache = await defaultRedis.get(time);
      if (ipCache) {
        const ips = ipCache.split(',');
        allIp = allIp.concat(ips);
      }
    }
    const frequency = {};
    allIp.forEach((item) => {
      if (frequency[item]) {
        frequency[item] += 1;
      } else {
        frequency[item] = 1;
      }
    });

    let ipCount = 1;
    Object.keys(frequency).forEach((val, key) => {
      const count = frequency[val];
      if (val == this.ip) {
        ipCount += count;
      }
    });
    return ipCount;
  }

  private async setIpCacheForNow() {
    const nowTimeKey = moment().format('YYYY-MM-DD HH:mm');
    const nowTimeIpCache = await defaultRedis.get(nowTimeKey);
    if (!nowTimeIpCache) {
      await defaultRedis.set(nowTimeKey, this.ip, 'EX', CacheExpireTime);
    } else {
      await defaultRedis.set(nowTimeKey, `${nowTimeIpCache},${this.ip}`, 'EX', CacheExpireTime);
    }
  }

  private getMinuteIntervals() {
    const now = moment();
    const minutesAgo = now.clone().subtract(this.min, 'm');
    const minuteIntervals = [];
    let time = minutesAgo;
    do {
      minuteIntervals.push(time.clone());
      time.add(1, 'm');
    } while (time.isBefore(now));

    return minuteIntervals;
  }

  private checkUA() {
    return this.uaArr.some((ua) => this.ua.includes(ua));
  }

  private checkBlackUA() {
    return this.blackUaArr.some((ua) => this.ua.includes(ua));
  }

  // 检查ip
  private async getAccessIpType() {
    return await AccessIpDao.current.findOne({
      ip: this.ip,
    });
  }
}
