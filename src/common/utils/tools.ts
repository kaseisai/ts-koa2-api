import md5 from 'md5';
import { getDateYmd } from '../dateHelper';

export class Tools {
  static MD5(str: string) {
    return md5(str);
  }

  static rounded(num: number) {
    return parseFloat(num.toFixed(2));
  }

  static streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
      const buffers = [];
      stream.on('error', reject);
      stream.on('data', (data) => buffers.push(data));
      stream.on('end', () => resolve(Buffer.concat(buffers)));
    });
  }

  static firstLetterCapital(str: string) {
    return str[0].toLocaleUpperCase() + str.substr(1, str.length - 1);
  }

  static checkMobile(phone) {
    if (!/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone)) {
      return false;
    }
    return true;
  }

  static checkOnlyNum(value: string) {
    return !/[^0-9+$]/.test(value);
  }

  static checkOnlyChart(value: string) {
    return /^[a-zA-Z]+$/.test(value);
  }

  static filterEmoji(text: string): string {
    const ranges = ['\ud83c[\udf00-\udfff]', '\ud83d[\udc00-\ude4f]', '\ud83d[\ude80-\udeff]'];
    return text.replace(new RegExp(ranges.join('|'), 'g'), '');
  }

  static GenSerialNo(seed: number) {
    const s = getDateYmd(new Date());
    const ss = seed.toString().padStart(4, '0');
    return s + ss;
  }

  static getYearAndMonth() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    return { year, month };
  }
}
