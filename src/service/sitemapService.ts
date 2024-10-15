import path from 'path';
import moment from 'moment';
import * as fs from 'fs';

import { baseConfig, websiteConfig } from '../common/configManager';
import { ProductStatus } from '../common/yz-utils/consts/product';
import { ProductDao } from '../repository/mysql/dao/product';
import { CompanyDao } from '../repository/mysql/dao/company';
import { CategoryDao } from '../repository/mysql/dao/category';

const config = baseConfig;

enum SitemapType {
  Product = 'product',
  Company = 'company',
  Category = 'category',
}

export class SitemapService {
  static current: SitemapService = new SitemapService();

  private sitemapUrlCount = 5000;
  private sitemapSavePath = path.resolve(__dirname, '..', '..', 'assets');

  private CreateIndexXmlFile(type: SitemapType, fileName: string | number) {
    const xmlPath = path.resolve(this.sitemapSavePath, 'sitemap', type, `${fileName}.xml`);
    if (!fs.existsSync(xmlPath)) {
      fs.mkdirSync(path.dirname(xmlPath), { recursive: true });
      fs.writeFileSync(xmlPath, '');
    }
    return xmlPath;
  }

  private async genXml(type: SitemapType) {
    const daoMap: Record<SitemapType, any> = {
      [SitemapType.Product]: ProductDao.current,
      [SitemapType.Category]: CategoryDao.current,
      [SitemapType.Company]: CompanyDao.current,
    };

    const dao = daoMap[type];
    const { rows, count } = await dao.findAndCountAll(
      { isEnabled: ProductStatus.EnAble },
      { attributes: ['id', 'createdAt'] },
    );
    const indexCount = Math.ceil(count / this.sitemapUrlCount);

    const lastmodMap = this.genNumberXml(rows, type, indexCount);
    this.genIndexXmlFile(indexCount, type, lastmodMap);
  }

  private genIndexXmlFile(indexCount: number, type: SitemapType, lastmodMap: any) {
    const indexXmlPath = this.CreateIndexXmlFile(type, 'index');
    let indexXmlStr = `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    for (let i = 1; i <= indexCount; i++) {
      const mapKey = `${type}-${i}`;
      const indexXmlContent = `
  <sitemap>
    <loc>${websiteConfig.baseUrl}/sitemap/${type}/${i}.xml</loc>
    <lastmod>${lastmodMap.get(mapKey)}</lastmod>
  </sitemap>`;
      indexXmlStr += indexXmlContent;
    }
    indexXmlStr += `
</sitemapindex>`;
    fs.writeFileSync(indexXmlPath, indexXmlStr);
  }

  private genNumberXml(rows: any[], type: SitemapType, indexCount: number) {
    let lastmodMap = new Map();

    for (let i = 0; i < indexCount; i++) {
      const xmlPath = this.CreateIndexXmlFile(type, i + 1);
      const start = i * this.sitemapUrlCount;
      const end = (i + 1) * this.sitemapUrlCount;
      let indexXmlStr = `<urlset  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
      for (let y = start; y < end; y++) {
        const row = rows[y];
        if (!row) {
          continue;
        }
        const time = row.createdAt ? moment(row.createdAt).format('YYYY-MM-DD') : '2024-02-01';
        const lastModTime = lastmodMap.get(`${type}-${i + 1}`);
        if (!lastModTime) {
          lastmodMap.set(`${type}-${i + 1}`, time);
        } else {
          if (moment(time).isAfter(lastModTime)) {
            lastmodMap.set(`${type}-${i + 1}`, time);
          }
        }

        const loc =
          type === SitemapType.Category
            ? `${websiteConfig.baseUrl}/product/${type}/${row.id}.html`
            : `${websiteConfig.baseUrl}/${type}/${row.id}.html`;
        const indexXmlContent = `
  <url>
    <loc>${loc}</loc>
    <lastmod>${time}</lastmod>
    <changefreq>daily</changefreq>
  </url>`;
        indexXmlStr += indexXmlContent;
      }
      indexXmlStr += `
</urlset>`;
      fs.writeFileSync(xmlPath, indexXmlStr);
    }
    return lastmodMap;
  }

  async generateSitemapXml() {
    await Promise.all([
      this.genXml(SitemapType.Product),
      this.genXml(SitemapType.Company),
      this.genXml(SitemapType.Category),
    ]);
  }
}

// async function test() {
//   require('../scripts/main');
//   await SitemapService.current.generateSitemapXml();
// }
// test()
//   .catch((error) => {
//     console.error('处理出错===>', error);
//   })
//   .finally(() => {
//     console.log('处理完成!!!');
//     process.exit(1);
//   });
