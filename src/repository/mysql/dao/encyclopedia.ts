import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { Encyclopedia, IEncyclopedia } from '../models/Encyclopedia';

export class EncyclopediaDao extends BaseDao {
  static current: EncyclopediaDao = new EncyclopediaDao();

  async create(entity: IEncyclopedia): Promise<Encyclopedia> {
    return Encyclopedia.create(entity);
  }

  async update(params: IEncyclopedia, entity: IEncyclopedia): Promise<void> {
    await Encyclopedia.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: IEncyclopedia, createParams: IEncyclopedia): Promise<Encyclopedia> {
    const [data] = await Encyclopedia.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: IEncyclopedia) {
    return Encyclopedia.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<Encyclopedia> {
    return await Encyclopedia.findByPk(id, { raw: true });
  }

  async findOne(params: IEncyclopedia, options?: FindOptions): Promise<Encyclopedia> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Encyclopedia.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: IEncyclopedia, options?: FindOptions): Promise<Encyclopedia[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Encyclopedia.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(
    params: IEncyclopedia,
    options?: FindOptions,
  ): Promise<{ rows: Encyclopedia[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Encyclopedia.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: IEncyclopedia, options?: FindOptions): Promise<number> {
    return Encyclopedia.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface QueryParams extends IEncyclopedia, IQueryParams {}
