import { AxiosResponse } from 'axios';

export interface ISubmitUrlService {
  submitUrlToSE(submitUrl: string, website: string): Promise<AxiosResponse<any, any>>;
}
