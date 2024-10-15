import { StaticFilesDao } from '../repository/mysql/dao/staticFiles';
import { ExtractImageAttr } from './common/pdf-extract-image';
import { baseConfig, websiteConfig } from '../common/configManager';
import { StaticFileType } from '../common/yz-utils/consts/staticFile';

export class StaticFileService {
  static current: StaticFileService = new StaticFileService();

  private config = baseConfig;

  async saveImage(image: ExtractImageAttr, productId?: string | null) {
    const { hash, name, url, extName, width, height, path } = image;
    const existingFile = await StaticFilesDao.current.findOne({ hash, productId });

    const processedUrl = url.replace(
      `${this.config.storage.options.saveDir}/${global.website}`,
      websiteConfig.baseApiUrl,
    );

    global.logger.info({
      message: 'pdf图片保存===>',
      data: {
        ...image,
        url: processedUrl,
        productId: productId || null,
      },
    });
    if (!existingFile) {
      await StaticFilesDao.current.create({
        hash,
        name,
        url: processedUrl,
        ext: extName,
        productId: productId || null,
        width,
        height,
        path,
        type: StaticFileType.Images,
      });
    } else {
      if (productId) {
        await StaticFilesDao.current.update({ productId }, { hash });
      }
    }
  }
}
