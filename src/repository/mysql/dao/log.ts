import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { Log, ILog } from '../models/Log';

export class LogDao extends BaseDao {
  static current: LogDao = new LogDao();

  async create(entity: ILog): Promise<Log> {
    return Log.create(entity);
  }

  async update(params: ILog, entity: ILog): Promise<void> {
    await Log.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: ILog, createParams: ILog): Promise<Log> {
    const [data] = await Log.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: ILog) {
    return Log.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<Log> {
    return await Log.findByPk(id, { raw: true });
  }

  async findOne(params: ILog, options?: FindOptions): Promise<Log> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Log.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: ILog, options?: FindOptions): Promise<Log[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Log.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(params: ILog, options?: FindOptions): Promise<{ rows: Log[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Log.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: ILog, options?: FindOptions): Promise<number> {
    return Log.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface LogQueryParams extends ILog, IQueryParams {}
