import { Table, Column } from 'sequelize-typescript';
import { EntityBase, IEntityBase } from '../entityBase';

export interface IUser extends IEntityBase {
  id?: string;
  avatarUrl?: string;
  nickname?: string;
  unionid?: string;
  openid?: string;
  sessionKey?: string;
  phone?: string;
  memo?: string;
  email?: string;
  password?: string;
}

@Table({
  tableName: 'user',
  timestamps: false,
})
export class User extends EntityBase<User> {
  @Column
  avatarUrl: string;

  @Column
  nickname: string;

  @Column
  openid: string;

  @Column
  unionid: string;

  @Column
  sessionKey: string;

  @Column
  phone: string;

  @Column
  memo: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  createdAt?: Date;
}
