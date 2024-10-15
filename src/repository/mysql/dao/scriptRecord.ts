import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { ScriptRecord, IScriptRecord } from '../models/ScriptRecord';

export class ScriptRecordDao extends BaseDao {
  static current: ScriptRecordDao = new ScriptRecordDao();

  async create(entity: IScriptRecord): Promise<ScriptRecord> {
    return ScriptRecord.create(entity);
  }

  async update(params: IScriptRecord, entity: IScriptRecord): Promise<void> {
    await ScriptRecord.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: IScriptRecord, createParams: IScriptRecord): Promise<ScriptRecord> {
    const [data] = await ScriptRecord.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: IScriptRecord) {
    return ScriptRecord.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<ScriptRecord> {
    return await ScriptRecord.findByPk(id, { raw: true });
  }

  async findOne(params: IScriptRecord, options?: FindOptions): Promise<ScriptRecord> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return ScriptRecord.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: IScriptRecord, options?: FindOptions): Promise<ScriptRecord[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return ScriptRecord.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(
    params: IScriptRecord,
    options?: FindOptions,
  ): Promise<{ rows: ScriptRecord[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return ScriptRecord.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: IScriptRecord, options?: FindOptions): Promise<number> {
    return ScriptRecord.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface ScriptRecordQueryParams extends IScriptRecord, IQueryParams {}
