import { Table, Column } from 'sequelize-typescript';
import { EntityBase, IEntityBase } from '../entityBase';

export interface IWebLinks extends IEntityBase {
  uniqueId?: string;
  linkType?: WebLinkType;
  website?: WebSite;
  websiteType?: string;
  searchEngine?: string;
  url?: string;
  isCommit2Baidu?: number;
  isCommit2Google?: number;
  createdAt?: any;
  updatedAt?: any;
}

export enum WebSite {
  OE1 = 'oe1',
  RF21 = '21rf',
}

export enum WebLinkType {
  Category = 'category',
  Product = 'product',
  Article = 'article',
}

@Table({ tableName: 'weblinks', timestamps: false })
export class WebLinks extends EntityBase<WebLinks> {
  @Column
  uniqueId: string;

  @Column
  linkType: string;

  @Column
  website: string;

  @Column
  websiteType: string;

  @Column
  searchEngine: string;

  @Column
  url: string;

  @Column
  isCommit2Baidu: number;

  @Column
  isCommit2Google: number;

  @Column
  createdAt?: Date;

  @Column
  updatedAt?: Date;
}
