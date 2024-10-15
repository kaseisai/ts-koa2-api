import Router = require('koa-router');
import * as path from 'path';

import { IRouteItem } from './routeDecorators';
import { baseConfig } from '../../configManager';
import { getAllFiles } from '../../utils/file';

export class RouteManager {
  static Current: RouteManager = new RouteManager();

  get Routes() {
    return this.routes;
  }

  private routes: IRouteItem[] = [];

  private koaRouter: Router;

  RegistRouteAdp(koaRouter) {
    this.koaRouter = koaRouter;
  }

  AddRoute(routeItem: IRouteItem) {
    this.routes.push(routeItem);
  }

  Destroy() {
    this.routes = null;
  }

  LoadRoutes(ctrlsPath: string[] = []) {
    for (const p of ctrlsPath) {
      require(path.resolve(p));
    }

    for (const p of baseConfig.controllers) {
      require(path.join(__dirname, `../../../${p.path}`));
    }

    if (baseConfig.allControllers) {
      const allFiles = getAllFiles(path.join(__dirname, `../../../${baseConfig.allControllers}`), []);
      for (const f of allFiles) {
        require(f);
      }
    }

    for (const item of this.routes) {
      // global.logger.info(`注册接口：[${item.method}]${item.path}`);
      if (item.middlewares && item.middlewares.length) {
        this.koaRouter[item.method.toLocaleLowerCase()](item.path, ...item.middlewares, item.ctrlHandle);
      } else {
        this.koaRouter[item.method.toLocaleLowerCase()](item.path, item.ctrlHandle);
      }
    }
  }
}
