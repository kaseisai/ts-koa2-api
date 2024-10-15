import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { StaticFiles, IStaticFiles } from '../models/StaticFiles';

export class StaticFilesDao extends BaseDao {
  static current: StaticFilesDao = new StaticFilesDao();

  async create(entity: IStaticFiles): Promise<StaticFiles> {
    return StaticFiles.create(entity);
  }

  async update(params: IStaticFiles, entity: IStaticFiles): Promise<void> {
    await StaticFiles.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: IStaticFiles, createParams: IStaticFiles): Promise<StaticFiles> {
    const [data] = await StaticFiles.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: IStaticFiles) {
    return StaticFiles.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<StaticFiles> {
    return await StaticFiles.findByPk(id, { raw: true });
  }

  async findOne(params: IStaticFiles, options?: FindOptions): Promise<StaticFiles> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return StaticFiles.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: IStaticFiles, options?: FindOptions): Promise<StaticFiles[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return StaticFiles.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(params: IStaticFiles, options?: FindOptions): Promise<{ rows: StaticFiles[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return StaticFiles.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: IStaticFiles, options?: FindOptions): Promise<number> {
    return StaticFiles.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface StaticFilesQueryParams extends IStaticFiles, IQueryParams {}
