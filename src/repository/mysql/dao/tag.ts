import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { Tag, ITag } from '../models/Tag';

export class TagDao extends BaseDao {
  static current: TagDao = new TagDao();

  async create(entity: ITag): Promise<Tag> {
    return Tag.create(entity);
  }

  async update(updateParams: ITag, whereEntity: ITag): Promise<void> {
    await Tag.update(updateParams, { where: { ...whereEntity } });
  }

  async findOrCreate(queryParams: ITag, createParams: ITag): Promise<Tag> {
    const [data] = await Tag.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: ITag) {
    return Tag.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<Tag> {
    return await Tag.findByPk(id, { raw: true });
  }

  async findOne(params: ITag, options?: FindOptions): Promise<Tag> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Tag.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: ITag, options?: FindOptions): Promise<Tag[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Tag.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(params: ITag, options?: FindOptions): Promise<{ rows: Tag[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Tag.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: ITag, options?: FindOptions): Promise<number> {
    return Tag.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface TagQueryParams extends ITag, IQueryParams {}
