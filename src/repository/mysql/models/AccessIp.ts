import { Table, Column } from 'sequelize-typescript';
import { EntityBase, IEntityBase } from '../entityBase';

export interface IAccessIp extends IEntityBase {
  ip?: string;
  type?: number;
  log?: string;
  ua?: string;
}

export enum IpType {
  White = 1, // 白名单IP
  Black = 2, // 黑名单IP
}

@Table({
  tableName: 'access_ip',
})
export class AccessIp extends EntityBase<AccessIp> {
  @Column
  ip: string;

  @Column
  type: number;

  @Column
  log: string;

  @Column
  ua: string;
}
