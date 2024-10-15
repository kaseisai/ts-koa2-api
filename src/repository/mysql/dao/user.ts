import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { User, IUser } from '../models/User';

export class UserDao extends BaseDao {
  static current: UserDao = new UserDao();

  async create(entity: IUser): Promise<User> {
    return User.create(entity);
  }

  async update(params: IUser, entity: IUser): Promise<void> {
    await User.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: IUser, createParams: IUser): Promise<User> {
    const [data] = await User.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: IUser) {
    return User.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<User> {
    return await User.findByPk(id, { raw: true });
  }

  async findOne(params: IUser, options?: FindOptions): Promise<User> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return User.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: IUser, options?: FindOptions): Promise<User[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return User.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(params: IUser, options?: FindOptions): Promise<{ rows: User[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return User.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: IUser, options?: FindOptions): Promise<number> {
    return User.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface QueryParams extends IUser, IQueryParams {}
