import { baseConfig, websiteConfig } from '../common/configManager';
import * as fs from 'fs';

const config = baseConfig;

export enum website {}

export enum InterfaceType {
  Web = 'web',
  Admin = 'admin',
}

enum StaticFileType {
  Article = 'articles',
}

enum FileSaveType {
  Upload = 'upload',
  StaticFiles = 'static-files',
}

export class StaticFilesPathBll {
  private saveDir: string;
  private baseName: string;
  private uploadBasePath: string;
  private staticFilesPath: string;
  private staticFilesUrl: string;

  static current: StaticFilesPathBll = new StaticFilesPathBll();
  constructor() {
    this.saveDir = config.storage.options.saveDir;
    this.baseName = global.website;
    this.uploadBasePath = `${this.saveDir}/${this.baseName}/${FileSaveType.Upload}`;
    this.staticFilesPath = `${this.saveDir}/${this.baseName}/${FileSaveType.StaticFiles}`;
    this.staticFilesUrl = `${websiteConfig.baseApiUrl}/${FileSaveType.StaticFiles}`;
  }

  private checkStat(path: string) {
    try {
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }
    } catch (error) {
      global.logger.info({ msg: 'checkStat====>', error });
      fs.mkdirSync(path, { recursive: true });
    }
  }

  public uploadPath() {
    return this.uploadBasePath;
  }

  public uploadPathWithCurrentYearAndMonth() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const path = `${this.uploadBasePath}/${year}/${month}`;
    this.checkStat(path);
    return path;
  }

  public uploadPath2BaseApiUrl(uploadPath: string) {
    return uploadPath.replace(`${this.saveDir}/${this.baseName}`, websiteConfig.baseApiUrl);
  }

  public articleCoverPath() {
    const path = `${this.staticFilesPath}/${StaticFileType.Article}/cover`;
    this.checkStat(path);
    return path;
  }

  public articleCoverUrl(fileName: string) {
    return `${this.staticFilesUrl}/${StaticFileType.Article}/cover/${fileName}`;
  }
}
