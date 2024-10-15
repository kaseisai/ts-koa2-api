import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { ProEncyclopediaRel, IProEncyclopediaRel } from '../models/ProEncyclopediaRel';

export class ProEncyclopediaRelDao extends BaseDao {
  static current: ProEncyclopediaRelDao = new ProEncyclopediaRelDao();

  async create(entity: IProEncyclopediaRel): Promise<ProEncyclopediaRel> {
    return ProEncyclopediaRel.create(entity);
  }

  async update(params: IProEncyclopediaRel, entity: IProEncyclopediaRel): Promise<void> {
    await ProEncyclopediaRel.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: IProEncyclopediaRel, createParams: IProEncyclopediaRel): Promise<ProEncyclopediaRel> {
    const [data] = await ProEncyclopediaRel.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: IProEncyclopediaRel) {
    return ProEncyclopediaRel.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<ProEncyclopediaRel> {
    return await ProEncyclopediaRel.findByPk(id, { raw: true });
  }

  async findOne(params: IProEncyclopediaRel, options?: FindOptions): Promise<ProEncyclopediaRel> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return ProEncyclopediaRel.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: IProEncyclopediaRel, options?: FindOptions): Promise<ProEncyclopediaRel[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return ProEncyclopediaRel.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(
    params: IProEncyclopediaRel,
    options?: FindOptions,
  ): Promise<{ rows: ProEncyclopediaRel[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return ProEncyclopediaRel.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: IProEncyclopediaRel, options?: FindOptions): Promise<number> {
    return ProEncyclopediaRel.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface QueryParams extends IProEncyclopediaRel, IQueryParams {}
