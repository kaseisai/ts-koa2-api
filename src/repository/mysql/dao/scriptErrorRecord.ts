import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { ScriptErrorRecord, IScriptErrorRecord } from '../models/ScriptErrorRecord';

export class ScriptErrorRecordDao extends BaseDao {
  static current: ScriptErrorRecordDao = new ScriptErrorRecordDao();

  async create(entity: IScriptErrorRecord): Promise<ScriptErrorRecord> {
    return ScriptErrorRecord.create(entity);
  }

  async update(params: IScriptErrorRecord, entity: IScriptErrorRecord): Promise<void> {
    await ScriptErrorRecord.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: IScriptErrorRecord, createParams: IScriptErrorRecord): Promise<ScriptErrorRecord> {
    const [data] = await ScriptErrorRecord.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: IScriptErrorRecord) {
    return ScriptErrorRecord.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<ScriptErrorRecord> {
    return await ScriptErrorRecord.findByPk(id, { raw: true });
  }

  async findOne(params: IScriptErrorRecord, options?: FindOptions): Promise<ScriptErrorRecord> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return ScriptErrorRecord.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: IScriptErrorRecord, options?: FindOptions): Promise<ScriptErrorRecord[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return ScriptErrorRecord.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(
    params: IScriptErrorRecord,
    options?: FindOptions,
  ): Promise<{ rows: ScriptErrorRecord[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return ScriptErrorRecord.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: IScriptErrorRecord, options?: FindOptions): Promise<number> {
    return ScriptErrorRecord.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface QueryParams extends IScriptErrorRecord, IQueryParams {}
