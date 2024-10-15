import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { PdfTxt, IPdfTxt } from '../models/PdfTxt';

export class PdfTxtDao extends BaseDao {
  static current: PdfTxtDao = new PdfTxtDao();

  async create(entity: IPdfTxt): Promise<PdfTxt> {
    return PdfTxt.create(entity);
  }

  async update(updateParams: IPdfTxt, whereEntity: IPdfTxt): Promise<void> {
    await PdfTxt.update(updateParams, { where: { ...whereEntity } });
  }

  async findOrCreate(queryParams: IPdfTxt, createParams: IPdfTxt): Promise<PdfTxt> {
    const [data] = await PdfTxt.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: IPdfTxt) {
    return PdfTxt.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<PdfTxt> {
    return await PdfTxt.findByPk(id, { raw: true });
  }

  async findOne(params: IPdfTxt, options?: FindOptions): Promise<PdfTxt> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return PdfTxt.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: IPdfTxt, options?: FindOptions): Promise<PdfTxt[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return PdfTxt.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(params: IPdfTxt, options?: FindOptions): Promise<{ rows: PdfTxt[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return PdfTxt.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: IPdfTxt, options?: FindOptions): Promise<number> {
    return PdfTxt.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface PdfTxtQueryParams extends IPdfTxt, IQueryParams {}
