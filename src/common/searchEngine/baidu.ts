import axios, { AxiosResponse } from 'axios';
import { ISubmitUrlService } from '.';
import { websiteConfig } from '../configManager';

export class SubmitUrlToBaiduService implements ISubmitUrlService {
  private baiduSubmitUrl = websiteConfig.searchEngine.baidu.url;
  private baiduApiKey = websiteConfig.searchEngine.baidu.apikey;

  constructor() {}
  async submitUrlToSE(submitUrl: string, website: string): Promise<AxiosResponse<any, any>> {
    return await axios({
      url: `${this.baiduSubmitUrl}?site=${website}&token=${this.baiduApiKey}`,
      method: 'post',
      headers: {
        'Content-Type': 'text/plain',
      },
      data: submitUrl,
    });
  }
}
