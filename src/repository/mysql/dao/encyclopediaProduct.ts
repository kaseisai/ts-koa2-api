import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { EncyclopediaProduct, IEncyclopediaProduct } from '../models/EncyclopediaProduct';

export class EncyclopediaProductDao extends BaseDao {
  static current: EncyclopediaProductDao = new EncyclopediaProductDao();

  async create(entity: IEncyclopediaProduct): Promise<EncyclopediaProduct> {
    return EncyclopediaProduct.create(entity);
  }

  async update(params: IEncyclopediaProduct, entity: IEncyclopediaProduct): Promise<void> {
    await EncyclopediaProduct.update(params, { where: { ...entity } });
  }

  async findOrCreate(
    queryParams: IEncyclopediaProduct,
    createParams: IEncyclopediaProduct,
  ): Promise<EncyclopediaProduct> {
    const [data] = await EncyclopediaProduct.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: IEncyclopediaProduct) {
    return EncyclopediaProduct.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<EncyclopediaProduct> {
    return await EncyclopediaProduct.findByPk(id, { raw: true });
  }

  async findOne(params: IEncyclopediaProduct, options?: FindOptions): Promise<EncyclopediaProduct> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return EncyclopediaProduct.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: IEncyclopediaProduct, options?: FindOptions): Promise<EncyclopediaProduct[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return EncyclopediaProduct.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(
    params: IEncyclopediaProduct,
    options?: FindOptions,
  ): Promise<{ rows: EncyclopediaProduct[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return EncyclopediaProduct.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: IEncyclopediaProduct, options?: FindOptions): Promise<number> {
    return EncyclopediaProduct.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface QueryParams extends IEncyclopediaProduct, IQueryParams {}
