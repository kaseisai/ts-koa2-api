import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { EncyclopediaCategory, IEncyclopediaCategory } from '../models/EncyclopediaCategory';

export class EncyclopediaCategoryDao extends BaseDao {
  static current: EncyclopediaCategoryDao = new EncyclopediaCategoryDao();

  async create(entity: IEncyclopediaCategory): Promise<EncyclopediaCategory> {
    return EncyclopediaCategory.create(entity);
  }

  async update(params: IEncyclopediaCategory, entity: IEncyclopediaCategory): Promise<void> {
    await EncyclopediaCategory.update(params, { where: { ...entity } });
  }

  async findOrCreate(
    queryParams: IEncyclopediaCategory,
    createParams: IEncyclopediaCategory,
  ): Promise<EncyclopediaCategory> {
    const [data] = await EncyclopediaCategory.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: IEncyclopediaCategory) {
    return EncyclopediaCategory.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<EncyclopediaCategory> {
    return await EncyclopediaCategory.findByPk(id, { raw: true });
  }

  async findOne(params: IEncyclopediaCategory, options?: FindOptions): Promise<EncyclopediaCategory> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return EncyclopediaCategory.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: IEncyclopediaCategory, options?: FindOptions): Promise<EncyclopediaCategory[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return EncyclopediaCategory.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(
    params: IEncyclopediaCategory,
    options?: FindOptions,
  ): Promise<{ rows: EncyclopediaCategory[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return EncyclopediaCategory.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: IEncyclopediaCategory, options?: FindOptions): Promise<number> {
    return EncyclopediaCategory.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface QueryParams extends IEncyclopediaCategory, IQueryParams {}
