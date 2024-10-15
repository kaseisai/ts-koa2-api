import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { DatasheetRequest, IDatasheetRequest } from '../models/DatasheetRequest';

export class DatasheetRequestDao extends BaseDao {
  static current: DatasheetRequestDao = new DatasheetRequestDao();

  async create(entity: IDatasheetRequest): Promise<DatasheetRequest> {
    return DatasheetRequest.create(entity);
  }

  async update(updateParams: IDatasheetRequest, whereEntity: IDatasheetRequest): Promise<void> {
    await DatasheetRequest.update(updateParams, { where: { ...whereEntity } });
  }

  async findOrCreate(queryParams: IDatasheetRequest, createParams: IDatasheetRequest): Promise<DatasheetRequest> {
    const [data] = await DatasheetRequest.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: IDatasheetRequest) {
    return DatasheetRequest.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<DatasheetRequest> {
    return await DatasheetRequest.findByPk(id, { raw: true });
  }

  async findOne(params: IDatasheetRequest, options?: FindOptions): Promise<DatasheetRequest> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return DatasheetRequest.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: IDatasheetRequest, options?: FindOptions): Promise<DatasheetRequest[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return DatasheetRequest.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(
    params: IDatasheetRequest,
    options?: FindOptions,
  ): Promise<{ rows: DatasheetRequest[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return DatasheetRequest.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: IDatasheetRequest, options?: FindOptions): Promise<number> {
    return DatasheetRequest.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface DatasheetRequestQueryParams extends IDatasheetRequest, IQueryParams {}
