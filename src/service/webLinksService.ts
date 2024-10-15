import { FindOptions, Op } from 'sequelize';
import axios from 'axios';

import { IQueryParams } from '../repository/mysql/dao/data/IQueryParams';
import { WebLinks, IWebLinks, WebSite, WebLinkType } from '../repository/mysql/models/WebLinks';
import { Category } from '../repository/mysql/models/Category';
import { Product } from '../repository/mysql/models/Product';
import { baseConfig } from '../common/configManager';
import { WebSiteLinks } from '../consts/website';
import { Article } from '../repository/mysql/models/Article';
import { ProductService } from './productService';
import { WebLinksDao } from '../repository/mysql/dao/webLinks';
import { Gpt2jsonDao } from '../repository/mysql/dao/gpt2json';
import { ProductDao } from '../repository/mysql/dao/product';
import { ProductStatus } from '../common/yz-utils/consts/product';

const config = baseConfig;
const webLinksDao = WebLinksDao.current;

export class WebLinksService {
  async createCategoryLinks() {
    const categories = await Category.findAll({ attributes: ['id'] });
    for (let c of categories) {
      await webLinksDao.findOrCreate(
        { uniqueId: c.id, linkType: WebLinkType.Category, website: WebSite.OE1 },
        {
          uniqueId: c.id,
          linkType: WebLinkType.Category,
          website: WebSite.OE1,
        },
      );
    }
  }

  async createArticleLinks() {
    const articles = await Article.findAll({
      where: {
        isEnabled: true,
      },
      attributes: ['id', 'createdAt', 'publishedAt'],
    });
    for (let c of articles) {
      await webLinksDao.findOrCreate(
        { uniqueId: c.id, linkType: WebLinkType.Article, website: WebSite.OE1 },
        {
          uniqueId: c.id,
          linkType: WebLinkType.Article,
          website: WebSite.OE1,
          createdAt: c.createdAt,
          updatedAt: c.publishedAt,
        },
      );
    }
  }

  async createProductLinks() {
    const products = await Product.findAll({
      where: {
        status: ProductStatus.EnAble,
      },
      attributes: ['id', 'isEnabled', 'createdAt', 'updatedAt'],
    });
    let i = 0;
    for (let c of products) {
      global.logger.info(`总数据${products.length}，处理第${i++}条`);
      await webLinksDao.findOrCreate(
        { uniqueId: c.id, linkType: WebLinkType.Product, website: WebSite.OE1 },
        {
          uniqueId: c.id,
          linkType: WebLinkType.Product,
          website: WebSite.OE1,
          createdAt: c.createdAt,
          updatedAt: c.updatedAt,
        },
      );
    }
  }

  // 已优化TDK产品列表
  async createTdkProductLinks() {
    const products = await Gpt2jsonDao.current.findAll(
      {
        isSuccess: 1,
        data: {
          [Op.not]: null,
        },
        failReason: '',
      },
      {
        attributes: ['productId'],
      },
    );
    let i = 0;
    for (let c of products) {
      global.logger.info(`总数据${products.length}，处理第${i++}条`);
      const product = await ProductDao.current.findOne({ id: c.productId });
      await webLinksDao.findOrCreate(
        { uniqueId: c.productId, linkType: WebLinkType.Product, website: WebSite.OE1 },
        {
          uniqueId: c.productId,
          linkType: WebLinkType.Product,
          website: WebSite.OE1,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        },
      );
    }
  }

  // 提交链接到百度
  async sendLinks2Baidu() {
    const weblinks = await webLinksDao.findAll(
      {
        isCommit2Baidu: 0,
        website: WebSite.OE1,
      },
      {
        limit: 1000,
        order: [['id', 'desc']],
      },
    );

    for (let w of weblinks) {
      try {
        const res = await axios({
          url: `${config.baiduLinkSubmit.url}?site=${WebSiteLinks.OE1}&token=${config.baiduLinkSubmit.oe1Token}`,
          method: 'post',
          headers: {
            'Content-Type': 'text/plain',
          },
          data: `https://www.${w.website}.com/${w.linkType}/${w.uniqueId}.html`,
        });
        global.logger.info({
          msg: 'res--->',
          data: {
            resData: res.data,
            id: w.id,
            link: `https://www.${w.website}.com/${w.linkType}/${w.uniqueId}.html`,
            time: new Date(),
          },
        });

        await WebLinks.update(
          {
            isCommit2Baidu: 1,
            updatedAt: new Date(),
          },
          {
            where: {
              id: w.id,
            },
          },
        );
      } catch (error) {
        global.logger.info({ msg: '发送链接到百度api error==>', error });
      }
    }
  }
}
export interface WebLinksQueryParams extends IWebLinks, IQueryParams {}
