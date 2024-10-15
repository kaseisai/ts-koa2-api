import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { SystemConfig, ISystemConfig } from '../models/SystemConfig';

export class SystemConfigDao extends BaseDao {
  static current: SystemConfigDao = new SystemConfigDao();

  async create(entity: ISystemConfig): Promise<SystemConfig> {
    return SystemConfig.create(entity);
  }

  async update(updateParams: ISystemConfig, whereEntity: ISystemConfig): Promise<void> {
    await SystemConfig.update(updateParams, { where: { ...whereEntity } });
  }

  async findOrCreate(queryParams: ISystemConfig, createParams: ISystemConfig): Promise<SystemConfig> {
    const [data] = await SystemConfig.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: ISystemConfig) {
    return SystemConfig.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<SystemConfig> {
    return await SystemConfig.findByPk(id, { raw: true });
  }

  async findOne(params: ISystemConfig, options?: FindOptions): Promise<SystemConfig> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return SystemConfig.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: ISystemConfig, options?: FindOptions): Promise<SystemConfig[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return SystemConfig.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(
    params: ISystemConfig,
    options?: FindOptions,
  ): Promise<{ rows: SystemConfig[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return SystemConfig.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: ISystemConfig, options?: FindOptions): Promise<number> {
    return SystemConfig.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface SystemConfigQueryParams extends ISystemConfig, IQueryParams {}
