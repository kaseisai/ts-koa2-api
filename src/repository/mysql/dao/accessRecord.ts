import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { AccessRecord, IAccessRecord } from '../models/AccessRecord';

export class AccessRecordDao extends BaseDao {
  static current: AccessRecordDao = new AccessRecordDao();

  async create(entity: IAccessRecord): Promise<AccessRecord> {
    return AccessRecord.create(entity);
  }

  async update(updateParams: IAccessRecord, whereEntity: IAccessRecord): Promise<void> {
    await AccessRecord.update(updateParams, { where: { ...whereEntity } });
  }

  async findOrCreate(queryParams: IAccessRecord, createParams: IAccessRecord): Promise<AccessRecord> {
    const [data] = await AccessRecord.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: IAccessRecord) {
    return AccessRecord.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<AccessRecord> {
    return await AccessRecord.findByPk(id, { raw: true });
  }

  async findOne(params: IAccessRecord, options?: FindOptions): Promise<AccessRecord> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return AccessRecord.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: IAccessRecord, options?: FindOptions): Promise<AccessRecord[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return AccessRecord.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(
    params: IAccessRecord,
    options?: FindOptions,
  ): Promise<{ rows: AccessRecord[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return AccessRecord.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: IAccessRecord, options?: FindOptions): Promise<number> {
    return AccessRecord.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface AccessRecordQueryParams extends IAccessRecord, IQueryParams {}
