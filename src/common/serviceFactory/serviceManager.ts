import * as path from 'path';
import { baseConfig } from '../configManager';
import * as fs from 'fs';

export class ServiceManager {
  static Current: ServiceManager = new ServiceManager();

  private svrList: IManagerServiceListItem[] = [];

  constructor() {}

  RegistService(serviceList?: IManagerServiceListItem[]) {
    if (serviceList) {
      for (const svr of serviceList) {
        const item = this.svrList.find(
          (x) => x.serviceName.toLocaleLowerCase() === svr.serviceName.toLocaleLowerCase(),
        );
        if (item) return;
        this.svrList.push(svr);
      }
    }

    const config = baseConfig;
    if (config.services) {
      for (const svr of config.services) {
        const module = require(path.join(__dirname, `../../${svr.path}`));
        this.svrList.push({
          serviceName: svr.name,
          service: new module[svr.name](),
        });
      }
    }

    if (config.serviceDirs) {
      for (const val of config.serviceDirs) {
        const dirPath = path.join(__dirname, `../../${val}`);
        const files = fs.readdirSync(dirPath);
        for (const file of files) {
          const fileName = file.split('.')[0];
          if (!fileName || fileName == 'web' || fileName === 'common') {
            continue;
          }

          try {
            const module = require(`${dirPath}/${fileName}`);
            const svrName = fileName[0].toUpperCase() + fileName.substring(1);
            this.svrList.push({
              serviceName: svrName,
              service: new module[svrName](),
            });
          } catch (error) {
            global.logger.info({ msg: 'service init error--->', error });
          }
        }
      }
    }

    for (const item of this.svrList) {
      if (item.service.OnLoad) {
        item.service.OnLoad();
      }
    }
  }

  GetService<T>(serviceName: string): T {
    // RPC
    const item = this.svrList.find((x) => x.serviceName.toLocaleLowerCase() === serviceName.toLocaleLowerCase());
    if (item) return item.service as any;
    return null;
  }
}

interface IManagerServiceListItem {
  service: IService;
  serviceName: string;
}

export interface IService {
  OnLoad(): void;
}
