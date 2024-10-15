import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { SysUser, ISysUser } from '../models/SysUser';

export class SysUserDao extends BaseDao {
  static current: SysUserDao = new SysUserDao();

  async create(entity: ISysUser): Promise<SysUser> {
    return SysUser.create(entity);
  }

  async update(params: ISysUser, entity: ISysUser): Promise<void> {
    await SysUser.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: ISysUser, createParams: ISysUser): Promise<SysUser> {
    const [data] = await SysUser.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: ISysUser) {
    return SysUser.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<SysUser> {
    return await SysUser.findByPk(id, { raw: true });
  }

  async findOne(params: ISysUser, options?: FindOptions): Promise<SysUser> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return SysUser.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: ISysUser, options?: FindOptions): Promise<SysUser[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return SysUser.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(params: ISysUser, options?: FindOptions): Promise<{ rows: SysUser[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return SysUser.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: ISysUser, options?: FindOptions): Promise<number> {
    return SysUser.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface SysUserQueryParams extends ISysUser, IQueryParams {}
