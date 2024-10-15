import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { CatCompanyRel, ICatCompanyRel } from '../models/CatCompanyRel';

export class CatCompanyRelDao extends BaseDao {
  static current: CatCompanyRelDao = new CatCompanyRelDao();

  async create(entity: ICatCompanyRel): Promise<CatCompanyRel> {
    return CatCompanyRel.create(entity);
  }

  async update(params: ICatCompanyRel, entity: ICatCompanyRel): Promise<void> {
    await CatCompanyRel.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: ICatCompanyRel, createParams: ICatCompanyRel): Promise<CatCompanyRel> {
    const [data] = await CatCompanyRel.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: ICatCompanyRel) {
    return CatCompanyRel.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<CatCompanyRel> {
    return await CatCompanyRel.findByPk(id, { raw: true });
  }

  async findOne(params: ICatCompanyRel, options?: FindOptions): Promise<CatCompanyRel> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return CatCompanyRel.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: ICatCompanyRel, options?: FindOptions): Promise<CatCompanyRel[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return CatCompanyRel.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(
    params: ICatCompanyRel,
    options?: FindOptions,
  ): Promise<{ rows: CatCompanyRel[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return CatCompanyRel.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: ICatCompanyRel, options?: FindOptions): Promise<number> {
    return CatCompanyRel.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface QueryParams extends ICatCompanyRel, IQueryParams {}
