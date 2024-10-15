import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { DeadLinks, IDeadLinks } from '../models/DeadLinks';

export class DeadLinksDao extends BaseDao {
  static current: DeadLinksDao = new DeadLinksDao();

  async create(entity: IDeadLinks): Promise<DeadLinks> {
    return DeadLinks.create(entity);
  }

  async update(updateParams: IDeadLinks, whereEntity: IDeadLinks): Promise<void> {
    await DeadLinks.update(updateParams, { where: { ...whereEntity } });
  }

  async findOrCreate(queryParams: IDeadLinks, createParams: IDeadLinks): Promise<DeadLinks> {
    const [data] = await DeadLinks.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: IDeadLinks) {
    return DeadLinks.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<DeadLinks> {
    return await DeadLinks.findByPk(id, { raw: true });
  }

  async findOne(params: IDeadLinks, options?: FindOptions): Promise<DeadLinks> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return DeadLinks.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: IDeadLinks, options?: FindOptions): Promise<DeadLinks[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return DeadLinks.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(params: IDeadLinks, options?: FindOptions): Promise<{ rows: DeadLinks[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return DeadLinks.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: IDeadLinks, options?: FindOptions): Promise<number> {
    return DeadLinks.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface DeadLinksQueryParams extends IDeadLinks, IQueryParams {}
