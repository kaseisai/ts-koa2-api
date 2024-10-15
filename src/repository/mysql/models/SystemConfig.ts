import { Table, Column } from 'sequelize-typescript';
import { EntityBase, IEntityBase } from '../entityBase';

export interface ISystemConfig extends IEntityBase {
  name?: string;
  value?: string;
}

@Table({
  tableName: 'system_config',
})
export class SystemConfig extends EntityBase<SystemConfig> {
  @Column
  name: string;

  @Column
  value: string;
}
