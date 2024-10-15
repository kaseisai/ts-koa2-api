import { Table, Column, PrimaryKey, AutoIncrement, Model } from 'sequelize-typescript';
import { EntityBase, IEntityBase } from '../entityBase';

export interface ISysUser {
  id?: number;
  username?: string;
  password?: string;
}

@Table({
  tableName: 'sysuser',
  timestamps: false,
})
export class SysUser extends Model<SysUser> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  username: string;

  @Column
  password: string;
}
