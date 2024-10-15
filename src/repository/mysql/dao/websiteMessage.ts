import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IWebsiteMessage, WebsiteMessage } from '../models/WebsiteMessage';

export class WebsiteMessageDao extends BaseDao {
  static current: WebsiteMessageDao = new WebsiteMessageDao();

  async create(entity: IWebsiteMessage): Promise<WebsiteMessage> {
    return WebsiteMessage.create(entity);
  }

  async update(updateParams: IWebsiteMessage, whereEntity: IWebsiteMessage): Promise<void> {
    await WebsiteMessage.update(updateParams, { where: { ...whereEntity } });
  }

  async findOrCreate(queryParams: IWebsiteMessage, createParams: IWebsiteMessage): Promise<WebsiteMessage> {
    const [data] = await WebsiteMessage.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: IWebsiteMessage) {
    return WebsiteMessage.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<WebsiteMessage> {
    return await WebsiteMessage.findByPk(id, { raw: true });
  }

  async findOne(params: IWebsiteMessage, options?: FindOptions): Promise<WebsiteMessage> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return WebsiteMessage.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: IWebsiteMessage, options?: FindOptions): Promise<WebsiteMessage[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return WebsiteMessage.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(
    params: IWebsiteMessage,
    options?: FindOptions,
  ): Promise<{ rows: WebsiteMessage[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return WebsiteMessage.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: IWebsiteMessage, options?: FindOptions): Promise<number> {
    return WebsiteMessage.count({
      where: { ...params },
      ...options,
    });
  }
}
