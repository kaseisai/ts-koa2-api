import axios, { AxiosResponse } from 'axios';
import { ISubmitUrlService } from '.';
import { websiteConfig } from '../configManager';

export class SubmitUrlToBingService implements ISubmitUrlService {
  private bingSubmitUrl = websiteConfig.searchEngine.bing.url;
  private bingApiKey = websiteConfig.searchEngine.bing.apikey;

  constructor() {}
  async submitUrlToSE(submitUrl: string): Promise<AxiosResponse<any, any>> {
    return await axios({
      url: `${this.bingSubmitUrl}?apikey=${this.bingApiKey}`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        siteUrl: websiteConfig.baseUrl /* 替换为你的站点，并且在Bing站长平台中验证过权限 */,
        url: submitUrl /* 替换为你需要推送的url */,
      },
    });
  }
}
