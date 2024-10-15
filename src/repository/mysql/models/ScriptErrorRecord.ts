import { Table, Column } from 'sequelize-typescript';
import { EntityBase, IEntityBase } from '../entityBase';

export interface IScriptErrorRecord extends IEntityBase {
  identify?: string;
  data?: string;
  isSuccess?: number;
  failReason?: string;
  failType?: number;
  scriptType?: string;
}

@Table({
  tableName: 'script_error_record',
})
export class ScriptErrorRecord extends EntityBase<ScriptErrorRecord> {
  @Column
  identify: string;

  @Column
  data: string;

  @Column
  isSuccess: number;

  @Column
  failReason: string;

  @Column
  failType: number;

  @Column
  scriptType: string;
}
