import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { Category, ICategory } from '../models/Category';

export class CategoryDao extends BaseDao {
  static current: CategoryDao = new CategoryDao();

  async create(entity: ICategory): Promise<Category> {
    return Category.create(entity);
  }

  async update(params: ICategory, entity: ICategory): Promise<void> {
    await Category.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: ICategory, createParams: ICategory): Promise<Category> {
    const [data] = await Category.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: ICategory) {
    return Category.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<Category> {
    return await Category.findByPk(id, { raw: true });
  }

  async findOne(params: ICategory, options?: FindOptions): Promise<Category> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Category.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: ICategory, options?: FindOptions): Promise<Category[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }

    return Category.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(params: ICategory, options?: FindOptions): Promise<{ rows: Category[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Category.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: ICategory, options?: FindOptions): Promise<number> {
    return Category.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface QueryParams extends ICategory, IQueryParams {}
