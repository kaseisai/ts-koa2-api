import { DeepLTranslate, specFormat, specTypeObj } from 'yuzhi-utils';
import { baseConfig } from '../common/configManager';

const config = baseConfig;

export class TranslateService {
  static current: TranslateService = new TranslateService();

  // 保留这个方法，因为有可能使用不同的第三方翻译
  async translateText(text: string | null): Promise<string | undefined> {
    if (!text) {
      return;
    }
    try {
      const translater = new DeepLTranslate({
        appKey: config.translate.deepl.appKey,
      });
      const result = await translater.translate(text);
      return result as string;
    } catch (error) {
      global.logger.info({ msg: 'translate Error:', error });
      return;
    }
  }
}
