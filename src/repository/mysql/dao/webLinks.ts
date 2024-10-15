import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { WebLinks, IWebLinks } from '../models/WebLinks';

export class WebLinksDao extends BaseDao {
  static current: WebLinksDao = new WebLinksDao();

  async create(entity: IWebLinks): Promise<WebLinks> {
    return WebLinks.create(entity);
  }

  async update(params: IWebLinks, entity: IWebLinks): Promise<void> {
    await WebLinks.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: IWebLinks, createParams: IWebLinks): Promise<WebLinks> {
    const [data] = await WebLinks.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: IWebLinks) {
    return WebLinks.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<WebLinks> {
    return await WebLinks.findByPk(id, { raw: true });
  }

  async findOne(params: IWebLinks, options?: FindOptions): Promise<WebLinks> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return WebLinks.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: IWebLinks, options?: FindOptions): Promise<WebLinks[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return WebLinks.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(params: IWebLinks, options?: FindOptions): Promise<{ rows: WebLinks[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return WebLinks.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: IWebLinks, options?: FindOptions): Promise<number> {
    return WebLinks.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface QueryParams extends IWebLinks, IQueryParams {}
