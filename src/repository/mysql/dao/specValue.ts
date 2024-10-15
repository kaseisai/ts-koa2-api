import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { SpecValue, ISpecValue } from '../models/SpecValue';

export class SpecValueDao extends BaseDao {
  static current: SpecValueDao = new SpecValueDao();

  async create(entity: ISpecValue): Promise<SpecValue> {
    return SpecValue.create(entity);
  }

  async update(params: ISpecValue, entity: ISpecValue): Promise<void> {
    await SpecValue.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: ISpecValue, createParams: ISpecValue): Promise<SpecValue> {
    const [data] = await SpecValue.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: ISpecValue) {
    return SpecValue.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<SpecValue> {
    return await SpecValue.findByPk(id, { raw: true });
  }

  async findOne(params: ISpecValue, options?: FindOptions): Promise<SpecValue> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return SpecValue.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: ISpecValue, options?: FindOptions): Promise<SpecValue[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return SpecValue.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(params: ISpecValue, options?: FindOptions): Promise<{ rows: SpecValue[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return SpecValue.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: ISpecValue, options?: FindOptions): Promise<number> {
    return SpecValue.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface QueryParams extends ISpecValue, IQueryParams {}
