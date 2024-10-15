import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { Gpt2json, IGpt2json } from '../models/Gpt2json';

export class Gpt2jsonDao extends BaseDao {
  static current: Gpt2jsonDao = new Gpt2jsonDao();

  async create(entity: IGpt2json): Promise<Gpt2json> {
    return Gpt2json.create(entity);
  }

  async update(params: IGpt2json, entity: IGpt2json): Promise<void> {
    await Gpt2json.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: IGpt2json, createParams: IGpt2json): Promise<Gpt2json> {
    const [data] = await Gpt2json.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: IGpt2json) {
    return Gpt2json.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<Gpt2json> {
    return await Gpt2json.findByPk(id, { raw: true });
  }

  async findOne(params: IGpt2json, options?: FindOptions): Promise<Gpt2json> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Gpt2json.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: IGpt2json, options?: FindOptions): Promise<Gpt2json[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Gpt2json.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(params: IGpt2json, options?: FindOptions): Promise<{ rows: Gpt2json[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Gpt2json.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: IGpt2json, options?: FindOptions): Promise<number> {
    return Gpt2json.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface QueryParams extends IGpt2json, IQueryParams {}
