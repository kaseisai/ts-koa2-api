import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { SearchRequest, ISearchRequest } from '../models/SearchRequest';

export class SearchRequestDao extends BaseDao {
  static current: SearchRequestDao = new SearchRequestDao();

  async create(entity: ISearchRequest): Promise<SearchRequest> {
    return SearchRequest.create(entity);
  }

  async update(params: ISearchRequest, entity: ISearchRequest): Promise<void> {
    await SearchRequest.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: ISearchRequest, createParams: ISearchRequest): Promise<SearchRequest> {
    const [data] = await SearchRequest.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: ISearchRequest) {
    return SearchRequest.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<SearchRequest> {
    return await SearchRequest.findByPk(id, { raw: true });
  }

  async findOne(params: ISearchRequest, options?: FindOptions): Promise<SearchRequest> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return SearchRequest.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: ISearchRequest, options?: FindOptions): Promise<SearchRequest[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return SearchRequest.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(
    params: ISearchRequest,
    options?: FindOptions,
  ): Promise<{ rows: SearchRequest[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return SearchRequest.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: ISearchRequest, options?: FindOptions): Promise<number> {
    return SearchRequest.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface SearchRequestQueryParams extends ISearchRequest, IQueryParams {}
