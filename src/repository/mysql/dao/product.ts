import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { Product, IProduct } from '../models/Product';

export class ProductDao extends BaseDao {
  static current: ProductDao = new ProductDao();

  async create(entity: IProduct): Promise<Product> {
    return Product.create(entity);
  }

  async update(updateParams: IProduct, whereEntity: IProduct) {
    return await Product.update(updateParams, { where: { ...whereEntity } });
  }

  async findOrCreate(queryParams: IProduct, createParams: IProduct): Promise<Product> {
    const [data] = await Product.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: IProduct) {
    return Product.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<Product> {
    return await Product.findByPk(id, { raw: true });
  }

  async findOne(params: IProduct, options?: FindOptions): Promise<Product> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Product.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: IProduct, options?: FindOptions): Promise<Product[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Product.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(params: IProduct, options?: FindOptions): Promise<{ rows: Product[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }

    return Product.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: IProduct, options?: FindOptions): Promise<number> {
    return Product.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface QueryParams extends IProduct, IQueryParams {}
