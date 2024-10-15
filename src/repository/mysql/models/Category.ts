import { Table, Column, AllowNull, Default } from 'sequelize-typescript';
import { EntityBase, IEntityBase } from '../entityBase';

export interface ICategory extends IEntityBase {
  id?: any;
  name?: string;
  cnName?: string;
  parentId?: string | any;
  isEnabled?: number;
  order?: any;
  metaTitle?: string;
  metaKeywords?: string;
  metaDescription?: string;
  description?: string;
  originUrl?: string;
  [key: string]: any;
}

@Table({
  tableName: 'category',
})
export class Category extends EntityBase<Category> {
  @AllowNull(false)
  @Column
  name: string;

  @Column
  parentId: string;

  @Default(0)
  @Column
  order: number;

  @Default(1)
  @Column
  isEnabled: number;

  @Column
  cnName: string;

  @Column
  metaTitle: string;

  @Column
  metaKeywords: string;

  @Column
  metaDescription: string;

  @Column
  description: string;

  @Column
  originUrl: string;
}
