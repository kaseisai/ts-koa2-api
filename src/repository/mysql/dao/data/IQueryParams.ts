import { EntityState } from '../../../data/EntityStateEnum';

export interface IQueryParams {
  /**
   * 页面查询索引，从1开始
   *
   * @type {number}
   * @memberof IQueryParams
   */
  pageIndex?: number;
  pageSize?: number;
  /**
   * 字段筛选
   *
   * @type {string[]}
   * @memberof IQueryParams
   */
  select?: string[];
  selectExclude?: string[];
  createdAtBegin?: Date;
  createdAtEnd?: Date;
  createdAt?: any;
  order?: any;
  raw?: boolean;
}
