import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { GptRecommendProduct, IGptRecommendProduct } from '../models/GptRecommendProduct';

export class GptRecommendProductDao extends BaseDao {
  static current: GptRecommendProductDao = new GptRecommendProductDao();

  async create(entity: IGptRecommendProduct): Promise<GptRecommendProduct> {
    return GptRecommendProduct.create(entity);
  }

  async update(updateParams: IGptRecommendProduct, whereEntity: IGptRecommendProduct): Promise<void> {
    await GptRecommendProduct.update(updateParams, { where: { ...whereEntity } });
  }

  async findOrCreate(
    queryParams: IGptRecommendProduct,
    createParams: IGptRecommendProduct,
  ): Promise<GptRecommendProduct> {
    const [data] = await GptRecommendProduct.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: IGptRecommendProduct) {
    return GptRecommendProduct.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<GptRecommendProduct> {
    return await GptRecommendProduct.findByPk(id, { raw: true });
  }

  async findOne(params: IGptRecommendProduct, options?: FindOptions): Promise<GptRecommendProduct> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return GptRecommendProduct.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: IGptRecommendProduct, options?: FindOptions): Promise<GptRecommendProduct[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return GptRecommendProduct.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(
    params: IGptRecommendProduct,
    options?: FindOptions,
  ): Promise<{ rows: GptRecommendProduct[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return GptRecommendProduct.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: IGptRecommendProduct, options?: FindOptions): Promise<number> {
    return GptRecommendProduct.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface GptRecommendProductQueryParams extends IGptRecommendProduct, IQueryParams {}
