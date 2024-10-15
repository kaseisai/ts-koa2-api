import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { Collection, ICollection } from '../models/Collection';

export class CollectionDao extends BaseDao {
  static current: CollectionDao = new CollectionDao();

  async create(entity: ICollection): Promise<Collection> {
    return Collection.create(entity);
  }

  async update(params: ICollection, entity: ICollection): Promise<void> {
    await Collection.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: ICollection, createParams: ICollection): Promise<Collection> {
    const [data] = await Collection.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: ICollection) {
    return Collection.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<Collection> {
    return await Collection.findByPk(id, { raw: true });
  }

  async findOne(params: ICollection, options?: FindOptions): Promise<Collection> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Collection.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: ICollection, options?: FindOptions): Promise<Collection[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Collection.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(params: ICollection, options?: FindOptions): Promise<{ rows: Collection[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Collection.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: ICollection, options?: FindOptions): Promise<number> {
    return Collection.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface CollectionQueryParams extends ICollection, IQueryParams {}
