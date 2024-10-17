import { StaticFilesDao } from '../repository/mysql/dao/staticFiles';
import { baseConfig, websiteConfig } from '../common/configManager';

export const enum StaticFileType {
  Logo = 1,
  Specification,
  Images,
  Attach,
}

export class StaticFileService {
  static current: StaticFileService = new StaticFileService();

  private config = baseConfig;

  async saveImage(image: any) {
    const { hash, name, url, extName, width, height, path } = image;
    const existingFile = await StaticFilesDao.current.findOne({ hash });

    const processedUrl = url.replace(
      `${this.config.storage.options.saveDir}/${global.website}`,
      websiteConfig.baseApiUrl,
    );

    global.logger.info({
      message: 'pdf图片保存===>',
      data: {
        ...image,
        url: processedUrl,
      },
    });
    if (!existingFile) {
      await StaticFilesDao.current.create({
        hash,
        name,
        url: processedUrl,
        ext: extName,
        width,
        height,
        path,
        type: StaticFileType.Images,
      });
    }
  }
}
