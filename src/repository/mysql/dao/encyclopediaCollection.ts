import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { EncyclopediaCollection, IEncyclopediaCollection } from '../models/EncyclopediaCollection';

export class EncyclopediaCollectionDao extends BaseDao {
  static current: EncyclopediaCollectionDao = new EncyclopediaCollectionDao();

  async create(entity: IEncyclopediaCollection): Promise<EncyclopediaCollection> {
    return EncyclopediaCollection.create(entity);
  }

  async update(params: IEncyclopediaCollection, entity: IEncyclopediaCollection): Promise<void> {
    await EncyclopediaCollection.update(params, { where: { ...entity } });
  }

  async findOrCreate(
    queryParams: IEncyclopediaCollection,
    createParams: IEncyclopediaCollection,
  ): Promise<EncyclopediaCollection> {
    const [data] = await EncyclopediaCollection.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: IEncyclopediaCollection) {
    return EncyclopediaCollection.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<EncyclopediaCollection> {
    return await EncyclopediaCollection.findByPk(id, { raw: true });
  }

  async findOne(params: IEncyclopediaCollection, options?: FindOptions): Promise<EncyclopediaCollection> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return EncyclopediaCollection.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: IEncyclopediaCollection, options?: FindOptions): Promise<EncyclopediaCollection[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return EncyclopediaCollection.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(
    params: IEncyclopediaCollection,
    options?: FindOptions,
  ): Promise<{ rows: EncyclopediaCollection[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return EncyclopediaCollection.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: IEncyclopediaCollection, options?: FindOptions): Promise<number> {
    return EncyclopediaCollection.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface QueryParams extends IEncyclopediaCollection, IQueryParams {}
