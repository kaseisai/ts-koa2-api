import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { Article, IArticle } from '../models/Article';

export class ArticleDao extends BaseDao {
  static current: ArticleDao = new ArticleDao();

  async create(entity: IArticle): Promise<Article> {
    return Article.create(entity);
  }

  async update(updateParams: IArticle, queryEntity: IArticle): Promise<void> {
    await Article.update(updateParams, { where: { ...queryEntity } });
  }

  async findOrCreate(queryParams: IArticle, createParams: IArticle): Promise<Article> {
    const [data] = await Article.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: IArticle) {
    return Article.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<Article> {
    return await Article.findByPk(id, { raw: true });
  }

  async findOne(params: IArticle, options?: FindOptions): Promise<Article> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Article.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: IArticle, options?: FindOptions): Promise<Article[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Article.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(params: IArticle, options?: FindOptions): Promise<{ rows: Article[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Article.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: IArticle, options?: FindOptions): Promise<number> {
    return Article.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface QueryParams extends IArticle, IQueryParams {}
