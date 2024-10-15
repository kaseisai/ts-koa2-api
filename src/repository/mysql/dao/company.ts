import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { Company, ICompany } from '../models/Company';

export class CompanyDao extends BaseDao {
  static current: CompanyDao = new CompanyDao();

  async create(entity: ICompany): Promise<Company> {
    return Company.create(entity);
  }

  async update(params: ICompany, entity: ICompany): Promise<void> {
    await Company.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: ICompany, createParams: ICompany): Promise<Company> {
    const [data] = await Company.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: ICompany) {
    return Company.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<Company> {
    return await Company.findByPk(id, { raw: true });
  }

  async findOne(params: ICompany, options?: FindOptions): Promise<Company> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Company.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: ICompany, options?: FindOptions): Promise<Company[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Company.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(params: ICompany, options?: FindOptions): Promise<{ rows: Company[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return Company.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: ICompany, options?: FindOptions): Promise<number> {
    return Company.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface QueryParams extends ICompany, IQueryParams {}
