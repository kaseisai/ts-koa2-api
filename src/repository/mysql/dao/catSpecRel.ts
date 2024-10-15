import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { CatSpecRel, ICatSpecRel } from '../models/CatSpecRel';

export class CatSpecRelDao extends BaseDao {
  static current: CatSpecRelDao = new CatSpecRelDao();

  async create(entity: ICatSpecRel): Promise<CatSpecRel> {
    return CatSpecRel.create(entity);
  }

  async update(params: ICatSpecRel, entity: ICatSpecRel): Promise<void> {
    await CatSpecRel.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: ICatSpecRel, createParams: ICatSpecRel): Promise<CatSpecRel> {
    const [data] = await CatSpecRel.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: ICatSpecRel) {
    return CatSpecRel.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<CatSpecRel> {
    return await CatSpecRel.findByPk(id, { raw: true });
  }

  async findOne(params: ICatSpecRel, options?: FindOptions): Promise<CatSpecRel> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return CatSpecRel.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: ICatSpecRel, options?: FindOptions): Promise<CatSpecRel[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return CatSpecRel.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(params: ICatSpecRel, options?: FindOptions): Promise<{ rows: CatSpecRel[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return CatSpecRel.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: ICatSpecRel, options?: FindOptions): Promise<number> {
    return CatSpecRel.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface QueryParams extends ICatSpecRel, IQueryParams {}
