import tencentcloud = require('tencentcloud-sdk-nodejs');
import { baseConfig } from '../configManager';

export class SmsSender {
  private readonly client: any;

  constructor() {
    const SmsClient = tencentcloud.sms.v20210111.Client;
    this.client = new SmsClient({
      credential: {
        secretId: process.env.TENCENT_SECRET_ID || baseConfig.sms.secretId,
        secretKey: process.env.TENCENT_SECRET_KEY || baseConfig.sms.secretKey,
      },
      region: 'ap-guangzhou',
      profile: {},
    });
  }

  sendSms(phones: string[], templateId: string, templateParams: string[]): void {
    phones = phones.map((phone) => '+86' + phone);
    const params = {
      SmsSdkAppId: process.env.SMS_APP_ID || baseConfig.sms.smsSdkAppId,
      SignName: '禹治科技',
      /* 国际/港澳台短信 senderid: 国内短信填空，默认未开通，如需开通请联系 [sms helper] */
      SenderId: '',
      /* 用户的 session 内容: 可以携带用户侧 ID 等上下文信息，server 会原样返回 */
      SessionContext: '',
      /* 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
       * 示例如：+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号 */
      PhoneNumberSet: phones,
      TemplateId: templateId,

      TemplateParamSet: templateParams,
    };

    this.client.SendSms(params, function (err, response) {
      if (err != null) {
        console.error(err);
      }
    });
  }
}
