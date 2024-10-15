import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { File, IFile } from '../models/File';

export class FileDao extends BaseDao {
  static current: FileDao = new FileDao();

  async create(entity: IFile): Promise<File> {
    return File.create(entity);
  }

  async update(params: IFile, entity: IFile): Promise<void> {
    await File.update(params, { where: { ...entity } });
  }

  async findOrCreate(queryParams: IFile, createParams: IFile): Promise<File> {
    const [data] = await File.findOrCreate({
      where: { ...queryParams },
      defaults: createParams,
    });
    return data;
  }

  delete(params: IFile) {
    return File.destroy({
      where: { ...params },
    });
  }

  async getById(id: string): Promise<File> {
    return await File.findByPk(id, { raw: true });
  }

  async findOne(params: IFile, options?: FindOptions): Promise<File> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return File.findOne({
      where: { ...params },
      ...options,
    });
  }

  async findAll(params: IFile, options?: FindOptions): Promise<File[]> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return File.findAll({
      where: { ...params },
      ...options,
    });
  }

  async findAndCountAll(params: IFile, options?: FindOptions): Promise<{ rows: File[]; count: number }> {
    if (!options) {
      options = { raw: true };
    }
    if (options && options.raw === undefined) {
      options.raw = true;
    }
    return File.findAndCountAll({
      where: { ...params },
      ...options,
    });
  }

  async count(params: IFile, options?: FindOptions): Promise<number> {
    return File.count({
      where: { ...params },
      ...options,
    });
  }
}
export interface QueryParams extends IFile, IQueryParams {}
