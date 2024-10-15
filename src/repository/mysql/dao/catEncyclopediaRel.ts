import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { CatEncyclopediaRel, ICatEncyclopediaRel } from '../models/CatEncyclopediaRel';

export class CatEncyclopediaRelDao extends BaseDao {
  static current: CatEncyclopediaRelDao = new CatEncyclopediaRelDao();

  async create(entity: ICatEncyclopediaRel): Promise<CatEncyclopediaRel> {
    return CatEncyclopediaRel.create(entity);
  }

  async update(params: ICatEncyclopediaRel, entity: ICatEncyclopediaRel): Promise<void> {
    await CatEncyclopediaRel.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: ICatEncyclopediaRel, createParams: ICatEncyclopediaRel): Promise<CatEncyclopediaRel> {
    const [data] = await CatEncyclopediaRel.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: ICatEncyclopediaRel) {
    return CatEncyclopediaRel.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<CatEncyclopediaRel> {
    return await CatEncyclopediaRel.findByPk(id, { raw: true });
  }

  async findOne(params: ICatEncyclopediaRel, options?: FindOptions): Promise<CatEncyclopediaRel> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return CatEncyclopediaRel.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: ICatEncyclopediaRel, options?: FindOptions): Promise<CatEncyclopediaRel[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return CatEncyclopediaRel.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(
    params: ICatEncyclopediaRel,
    options?: FindOptions,
  ): Promise<{ rows: CatEncyclopediaRel[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return CatEncyclopediaRel.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: ICatEncyclopediaRel, options?: FindOptions): Promise<number> {
    return CatEncyclopediaRel.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface QueryParams extends ICatEncyclopediaRel, IQueryParams {}
