import bcrypt = require('bcrypt');

import { UserDao } from '../../repository/mysql/dao/user';
import { genSnowflakeId } from '../../common/utils/random';
import { VerificationCodeManager } from '../../common/utils/verification-code';
import { SmsSender } from '../../common/utils/sms';
import { Op } from 'sequelize';
import { genPageLinks } from '../../common/utils/url';

export interface QueryUserListParams {
  url: string;
  offset: number;
  limit: number;
  name?: string;
}
export class UserService {
  static current: UserService = new UserService();

  private readonly codeManager = new VerificationCodeManager();
  private readonly smsSender = new SmsSender();

  async query(params: QueryUserListParams) {
    let { url, offset, limit, name } = params;
    let whereQb: any = {};
    if (name) {
      whereQb.nickname = { [Op.like]: `%${name}%` };
    }
    let { rows: companies, count: total } = await UserDao.current.findAndCountAll(whereQb, {
      offset,
      limit,
    });
    const [previousLink, nextLink] = genPageLinks(url, total, offset, limit);
    return {
      meta: {
        offset,
        limit,

        total,

        previous: previousLink,
        next: nextLink,
      },
      objects: companies,
    };
  }

  async update(id: string, dto: { nickname?: string; email?: string }): Promise<void> {
    if (Object.keys(dto).length <= 0) {
      return;
    }

    await UserDao.current.update({ ...dto }, { id });
  }

  async login(phone: string, password: string) {
    const user = await UserDao.current.findOne({
      phone,
    });
    if (user == null || user.password == null) {
      return null;
    }

    if (bcrypt.compareSync(password, user.password)) {
      delete user.password;
      return user;
    }

    return null;
  }

  async register(dto: { phone: string; password: string; nickname: string; email: string }) {
    const entity: any = dto;

    const exists = await this.exists({
      phone: dto.phone,
    });
    if (exists) {
      throw new Error(`手机号${dto.phone}已注册`);
    }

    if (!entity.nickname) {
      entity.nickname = entity.phone;
    }

    entity.id = genSnowflakeId();
    entity.password = this.hashPassword(dto.password);

    await UserDao.current.create(entity);

    return entity;
  }

  async requestLoginCode(mobile: string): Promise<void> {
    const exists = await this.exists({
      phone: mobile,
    });
    if (!exists) {
      throw new Error(`未找到手机号为 ${mobile} 的用户`);
    }

    const code = await this.codeManager.genCode(mobile);

    this.smsSender.sendSms([mobile], '1805213', [code]);
  }

  async smsLogin(code: string, mobile: string): Promise<any> {
    global.logger.info({ msg: 'sms login==>', data: { code, mobile } });
    const isValidCode = await this.codeManager.verifyCode(mobile, code);
    if (!isValidCode) {
      throw new TypeError('验证码错误');
    }

    const user = await UserDao.current.findOne({
      phone: mobile,
    });
    if (user == null) {
      throw new TypeError(`未找到手机号为 ${mobile} 的用户`);
    }

    delete user.password;

    return user;
  }

  async passwordRequestCode(mobile: string): Promise<void> {
    const exists = await this.exists({
      phone: mobile,
    });
    if (!exists) {
      throw new RangeError(`未找到手机号为 ${mobile} 的用户`);
    }

    const code = await this.codeManager.genCode(mobile);

    this.smsSender.sendSms([mobile], '1802856', [code]);
  }

  async updatePassword(code: string, mobile: string, password: string): Promise<void> {
    const isValidCode = await this.codeManager.verifyCode(mobile, code);
    if (!isValidCode) {
      throw new TypeError('验证码错误');
    }

    const user = await UserDao.current.findOne({ phone: mobile });
    if (!user) {
      throw new RangeError(`未找到手机号为 ${mobile} 的用户`);
    }

    await UserDao.current.update(
      {
        password: this.hashPassword(password),
      },
      { phone: mobile },
    );
  }

  async requestPhoneCode(mobile: string): Promise<void> {
    const exists = await this.exists({
      phone: mobile,
    });
    if (exists) {
      throw new RangeError(`手机号为 ${mobile} 的用户已存在`);
    }

    const code = await this.codeManager.genCode(mobile);

    this.smsSender.sendSms([mobile], '1499956', [code]);
  }

  async verifyPhoneCode(mobile: string, code: string) {
    const isValid = await this.codeManager.verifyCode(mobile, code);

    return {
      status: isValid,
    };
  }

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  private async exists(cond: any): Promise<boolean> {
    const rows = await UserDao.current.findAll(cond);
    return rows.length > 0;
  }
}
