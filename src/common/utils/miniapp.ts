import axiosLib = require('axios');
import { baseConfig } from '../configManager';

const axios = axiosLib.default;

export const appId = process.env.MINI_APP_ID || baseConfig.wechat.miniAppId;
export const appSecret = process.env.MINI_APP_SECRET || baseConfig.wechat.miniAppSecret;

const accessTokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;

export async function getAccessToken(): Promise<string | null> {
  const res = await axios.get(accessTokenUrl, {
    validateStatus: null,
  });

  if (res.status !== 200) {
    return null;
  }

  const body = res.data;
  if (body.access_token == null) {
    return null;
  }

  return body.access_token;
}
