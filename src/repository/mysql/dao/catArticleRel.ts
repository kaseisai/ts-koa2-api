import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { CatArticleRel, ICatArticleRel } from '../models/CatArticleRel';

export class CatArticleRelDao extends BaseDao {
  static current: CatArticleRelDao = new CatArticleRelDao();

  async create(entity: ICatArticleRel): Promise<CatArticleRel> {
    return CatArticleRel.create(entity);
  }

  async update(params: ICatArticleRel, entity: ICatArticleRel): Promise<void> {
    await CatArticleRel.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: ICatArticleRel, createParams: ICatArticleRel): Promise<CatArticleRel> {
    const [data] = await CatArticleRel.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: ICatArticleRel) {
    return CatArticleRel.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<CatArticleRel> {
    return await CatArticleRel.findByPk(id, { raw: true });
  }

  async findOne(params: ICatArticleRel, options?: FindOptions): Promise<CatArticleRel> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return CatArticleRel.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: ICatArticleRel, options?: FindOptions): Promise<CatArticleRel[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return CatArticleRel.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(
    params: ICatArticleRel,
    options?: FindOptions,
  ): Promise<{ rows: CatArticleRel[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return CatArticleRel.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: ICatArticleRel, options?: FindOptions): Promise<number> {
    return CatArticleRel.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface QueryParams extends ICatArticleRel, IQueryParams {}
