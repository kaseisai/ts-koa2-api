require('../start/main');

import * as path from 'path';
import { ConfigManager } from '../common/configManager';
// 本地调试如果要使用不同的配置文件，需要在main之前引入
// ConfigManager.current.Load(path.join(__dirname, '../../config-product.json'));

import { WebLinksService } from '../service/webLinksService';

const webLinksSvr = new WebLinksService();

async function addAllWebLinks() {
  // await webLinksSvr.createArticleLinks();
  // await webLinksSvr.createCategoryLinks();
  // await webLinksSvr.createProductLinks();
  // await webLinksSvr.createTdkProductLinks();

  await webLinksSvr.sendLinks2Baidu();
}
addAllWebLinks()
  .catch((error) => {
    console.log('addAllWebLinks error===>', error);
  })
  .finally(() => {
    console.log('done!!!');
  });
