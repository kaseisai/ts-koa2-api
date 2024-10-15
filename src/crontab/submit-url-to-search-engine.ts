/**
 * 定时任务，每天定时提交链接给搜索引擎，提高搜索引擎收录速度
 * 获取不同模块的最新链接，每日新增的链接放在最前
 * 每个站点可能有pc和m的区分，注意不同的配置文件
 */
import '../start/main';

import { websiteConfig } from '../common/configManager';
import { WebLinksDao } from '../repository/mysql/dao/webLinks';
import { LinkType, SearchEngine } from '../consts/search-engine';
import { Op } from 'sequelize';
import { SubmitUrlToBingService } from '../common/searchEngine/bing';
import { SubmitUrlToBaiduService } from '../common/searchEngine/baidu';

async function submitUrlToSearchEngine() {
  const searchEngineArr = [];
  Object.keys(SearchEngine).forEach(async (val, key) => {
    searchEngineArr.push(SearchEngine[val]);
  });
  global.logger.info({ msg: 'searchEngineArr', data: searchEngineArr });

  for (const searchEngine of searchEngineArr) {
    global.logger.info({ msg: 'apikey', data: websiteConfig.searchEngine[searchEngine].apikey });
    if (!websiteConfig.searchEngine[searchEngine].apikey) {
      continue;
    }

    // 查找已提交的所有链接
    const submittedUrls = await WebLinksDao.current.findAll({
      website: global.website,
      searchEngine,
      websiteType: global.websiteType,
    });

    const submittedArticleIds = [];
    for (const s of submittedUrls) {
      if (s.linkType === LinkType.ARTICLE) {
        submittedArticleIds.push(s.uniqueId);
      }
    }
    // TODO: 这里要获取所有的要提交的数据
    // 示例:
    // const [articles] = await Promise.all([
    //   ArticleDao.current.findAll(
    //     {
    //       isEnabled: 1,
    //       id: {
    //         [Op.notIn]: submittedArticleIds,
    //       },
    //     },
    //     {
    //       attributes: ['id'],
    //       order: [['publishedAt', 'desc']],
    //     },
    //   ),
    // ]);
    let allNeedSubmittedIds = [];
    // articles.map((val) => allNeedSubmittedIds.push({ id: val.id, linkType: LinkType.ARTICLE }));
    allNeedSubmittedIds = allNeedSubmittedIds.slice(0, websiteConfig.searchEngine[searchEngine].limit - 1);
    let searchEngineService;
    switch (searchEngine) {
      case SearchEngine.BAIDU:
        searchEngineService = new SubmitUrlToBaiduService();
        break;
      case SearchEngine.BING:
        searchEngineService = new SubmitUrlToBingService();
        break;
      default:
        break;
    }
    for (const u of allNeedSubmittedIds) {
      const url = `${websiteConfig.baseUrl}/${u.linkType}/${u.id}.html`;
      const res = await searchEngineService.submitUrlToSE(url, websiteConfig.baseUrl);
      try {
        global.logger.info({
          msg: 'res--->',
          data: {
            uniqueId: u.id,
            linkType: u.linkType,
            website: global.website,
            websiteType: global.websiteType,
            url,
            searchEngine,
            resData: res.data,
            time: new Date(),
          },
        });
        await WebLinksDao.current.findOrCreate(
          { uniqueId: u.id, linkType: u.linkType, website: global.website },
          {
            uniqueId: u.id,
            linkType: u.linkType,
            website: global.website,
            websiteType: global.websiteType,
            url,
            searchEngine,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        );
      } catch (error) {
        global.logger.info({
          msg: '提交链接出错--->',
          data: {
            uniqueId: u.id,
            linkType: u.linkType,
            website: global.website,
            websiteType: global.websiteType,
            url,
            searchEngine,
          },
          error: error.stack,
        });
      }
    }
  }
}

submitUrlToSearchEngine()
  .catch((error: Error) => {
    console.error('处理出错===>', error);
  })
  .finally(() => {
    console.log('处理完成!!!');
  });
