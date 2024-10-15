import { Table, Column, DataType } from 'sequelize-typescript';
import { EntityBase, IEntityBase } from '../entityBase';

export interface IScriptRecord extends IEntityBase {
  subject?: string;
  productId?: string;
  companyId?: string;
  isSuccess?: number;
  failReason?: string;
  data?: string;
  failType?: number;
}

@Table({
  tableName: 'script_record',
})
export class ScriptRecord extends EntityBase<ScriptRecord> {
  @Column({
    type: DataType.CHAR(255),
    comment: '脚本主题',
  })
  subject: string;

  @Column({
    type: DataType.CHAR(19),
    comment: '产品id',
  })
  productId: string;

  @Column({
    type: DataType.CHAR(19),
    comment: '厂家id',
  })
  companyId: string;

  @Column({
    type: DataType.TINYINT,
    comment: '是否成功',
  })
  isSuccess: number;

  @Column({
    type: DataType.TEXT,
    comment: '失败原因',
  })
  failReason: string;

  @Column({
    type: DataType.TEXT,
    comment: '成功的数据记录',
  })
  data: string;

  @Column
  failType: number;
}
