import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

export interface ILog {
  id?: number;
  table?: string;
  recordId?: string;
  action?: number;
  oldData?: any;
  newData?: any;
  optBy?: string;
  optAt?: any;
}

@Table({
  tableName: 'log',
  timestamps: false,
})
export class Log extends Model<Log> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  table: string;

  @Column
  recordId: string;

  @Column
  action: number;

  @Column({
    type: DataType.JSON,
  })
  oldData;

  @Column({
    type: DataType.JSON,
  })
  newData;

  @Column
  optBy: string;

  @Column
  optAt: Date;
}
