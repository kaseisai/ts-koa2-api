import { Table, Column } from 'sequelize-typescript';
import { EntityBase, IEntityBase } from '../entityBase';

export interface IStaticFiles extends IEntityBase {
  name?: string;
  url?: string;
  isEnabled?: number;
  uniqueId?: string;
  ext?: string;
  hash?: any;
  width?: any;
  height?: any;
  path?: string;
  type?: number;
}

@Table({
  tableName: 'static_files',
})
export class StaticFiles extends EntityBase<StaticFiles> {
  @Column
  name: string;

  @Column
  url: string;

  @Column
  isEnabled: number;

  @Column
  uniqueId: string;

  @Column
  hash: string;

  @Column
  ext: string;

  @Column
  path: string;

  @Column
  width: number;

  @Column
  height: number;

  @Column
  type: number;
}
