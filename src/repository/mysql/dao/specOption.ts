import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { SpecOption, ISpecOption } from '../models/SpecOption';

export class SpecOptionDao extends BaseDao {
  static current: SpecOptionDao = new SpecOptionDao();

  async create(entity: ISpecOption): Promise<SpecOption> {
    return SpecOption.create(entity);
  }

  async update(params: ISpecOption, entity: ISpecOption): Promise<void> {
    await SpecOption.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: ISpecOption, createParams: ISpecOption): Promise<SpecOption> {
    const [data] = await SpecOption.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: ISpecOption) {
    return SpecOption.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<SpecOption> {
    return await SpecOption.findByPk(id, { raw: true });
  }

  async findOne(params: ISpecOption, options?: FindOptions): Promise<SpecOption> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return SpecOption.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: ISpecOption, options?: FindOptions): Promise<SpecOption[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return SpecOption.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(params: ISpecOption, options?: FindOptions): Promise<{ rows: SpecOption[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return SpecOption.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: ISpecOption, options?: FindOptions): Promise<number> {
    return SpecOption.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface QueryParams extends ISpecOption, IQueryParams {}
