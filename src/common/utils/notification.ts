import axiosLib = require('axios');
import { baseConfig } from '../configManager';
const axios = axiosLib.default;

export async function workWeixinNotification(message: string): Promise<any> {
  // return await axios.post(baseConfig.webhook, {
  //   msgtype: 'text',
  //   text: {
  //     content: message,
  //   },
  // });
}
