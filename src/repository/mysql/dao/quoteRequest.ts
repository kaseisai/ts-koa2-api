import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { QuoteRequest, IQuoteRequest } from '../models/QuoteRequest';

export class QuoteRequestDao extends BaseDao {
  static current: QuoteRequestDao = new QuoteRequestDao();

  async create(entity: IQuoteRequest): Promise<QuoteRequest> {
    return QuoteRequest.create(entity);
  }

  async update(updateParams: IQuoteRequest, whereEntity: IQuoteRequest): Promise<void> {
    await QuoteRequest.update(updateParams, { where: { ...whereEntity } });
  }

  async findOrCreate(queryParams: IQuoteRequest, createParams: IQuoteRequest): Promise<QuoteRequest> {
    const [data] = await QuoteRequest.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: IQuoteRequest) {
    return QuoteRequest.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<QuoteRequest> {
    return await QuoteRequest.findByPk(id, { raw: true });
  }

  async findOne(params: IQuoteRequest, options?: FindOptions): Promise<QuoteRequest> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return QuoteRequest.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: IQuoteRequest, options?: FindOptions): Promise<QuoteRequest[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return QuoteRequest.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(
    params: IQuoteRequest,
    options?: FindOptions,
  ): Promise<{ rows: QuoteRequest[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return QuoteRequest.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: IQuoteRequest, options?: FindOptions): Promise<number> {
    return QuoteRequest.count({
      where: { ...params },
      ...options,
    });
  }
}
