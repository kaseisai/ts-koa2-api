import { Table, Column } from 'sequelize-typescript';
import { EntityBase, IEntityBase } from '../entityBase';

export interface IDeadLinks extends IEntityBase {
  uniqueId?: string;
  linkType?: DeadLinkType;
  website?: DeadWebSite;
  isCommit2Baidu?: number;
  isCommit2Google?: number;
  createdAt?: any;
  updatedAt?: any;
}

export enum DeadWebSite {
  OE1 = 'oe1',
  RF21 = '21rf',
}

export enum DeadLinkType {
  Category = 'category',
  Product = 'product',
  Article = 'article',
  Company = 'company',
}

@Table({ tableName: 'deadlinks' })
export class DeadLinks extends EntityBase<DeadLinks> {
  @Column
  uniqueId: string;

  @Column
  linkType: string;

  @Column
  website: string;

  @Column
  isCommit2Baidu: number;

  @Column
  isCommit2Google: number;
}
