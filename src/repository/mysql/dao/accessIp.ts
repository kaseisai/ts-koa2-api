import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { AccessIp, IAccessIp } from '../models/AccessIp';

export class AccessIpDao extends BaseDao {
  static current: AccessIpDao = new AccessIpDao();

  async create(entity: IAccessIp): Promise<AccessIp> {
    return AccessIp.create(entity);
  }

  async update(params: IAccessIp, entity: IAccessIp): Promise<void> {
    await AccessIp.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: IAccessIp, createParams: IAccessIp): Promise<AccessIp> {
    const [data] = await AccessIp.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: IAccessIp) {
    return AccessIp.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<AccessIp> {
    return (await AccessIp.findByPk(id, { raw: true }));
  }

  async findOne(params: IAccessIp, options?: FindOptions): Promise<AccessIp> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return AccessIp.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: IAccessIp, options?: FindOptions): Promise<AccessIp[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return AccessIp.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(params: IAccessIp, options?: FindOptions): Promise<{ rows: AccessIp[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return AccessIp.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: IAccessIp, options?: FindOptions): Promise<number> {
    return AccessIp.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface QueryParams extends IAccessIp, IQueryParams {}
