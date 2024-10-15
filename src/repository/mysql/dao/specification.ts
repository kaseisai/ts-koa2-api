import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { Specification, ISpecification, ISpecificationQuery } from '../models/Specification';

export class SpecificationDao extends BaseDao {
  static current: SpecificationDao = new SpecificationDao();

  async create(entity: ISpecification): Promise<Specification> {
    return Specification.create(entity);
  }

  async update(params: ISpecification, entity: ISpecification): Promise<void> {
    await Specification.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: ISpecification, createParams: ISpecification): Promise<Specification> {
    const [data] = await Specification.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: ISpecification) {
    return Specification.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<Specification> {
    return await Specification.findByPk(id, { raw: true });
  }

  async findOne(params: ISpecification, options?: FindOptions): Promise<Specification> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Specification.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: ISpecificationQuery, options?: FindOptions): Promise<Specification[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Specification.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(
    params: ISpecification,
    options?: FindOptions,
  ): Promise<{ rows: Specification[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Specification.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: ISpecification, options?: FindOptions): Promise<number> {
    return Specification.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface QueryParams extends ISpecification, IQueryParams {}
