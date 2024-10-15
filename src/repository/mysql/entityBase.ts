import { AfterFind, BeforeCreate, Column, DataType, Length, Model } from 'sequelize-typescript';
import { genSnowflakeId } from '../../common/utils/random';
import moment from 'moment';

export class EntityBase<T> extends Model<T> {
  @Length({ max: 19 })
  @Column({
    type: DataType.CHAR,
    primaryKey: true,
  })
  declare id: string;

  @BeforeCreate
  static makeID(instance: any) {
    instance.id = genSnowflakeId();
  }

  @AfterFind
  static formatDate(instance: any) {
    if (instance && instance.createdAt) {
      instance.createdAt = moment(instance.createdAt).format('YYYY-MM-DD HH:mm:ss');
    }
    if (instance && instance.updatedAt) {
      instance.updatedAt = moment(instance.updatedAt).format('YYYY-MM-DD HH:mm:ss');
    }
    if (instance && instance.publishedAt) {
      instance.publishedAt = moment(instance.publishedAt).format('YYYY-MM-DD HH:mm:ss');
    }
  }
}

export interface IEntityBase {
  id?: string;
}
