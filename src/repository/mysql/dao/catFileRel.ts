import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { CatFileRel, ICatFileRel } from '../models/CatFileRel';

export class CatFileRelDao extends BaseDao {
  static current: CatFileRelDao = new CatFileRelDao();

  async create(entity: ICatFileRel): Promise<CatFileRel> {
    return CatFileRel.create(entity);
  }

  async update(params: ICatFileRel, entity: ICatFileRel): Promise<void> {
    await CatFileRel.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: ICatFileRel, createParams: ICatFileRel): Promise<CatFileRel> {
    const [data] = await CatFileRel.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: ICatFileRel) {
    return CatFileRel.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<CatFileRel> {
    return await CatFileRel.findByPk(id, { raw: true });
  }

  async findOne(params: ICatFileRel, options?: FindOptions): Promise<CatFileRel> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return CatFileRel.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: ICatFileRel, options?: FindOptions): Promise<CatFileRel[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return CatFileRel.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(params: ICatFileRel, options?: FindOptions): Promise<{ rows: CatFileRel[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return CatFileRel.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: ICatFileRel, options?: FindOptions): Promise<number> {
    return CatFileRel.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface QueryParams extends ICatFileRel, IQueryParams {}
