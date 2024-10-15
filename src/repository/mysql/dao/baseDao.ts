import { FindOptions, Op } from 'sequelize';
import { IService } from '../../../common/serviceFactory/serviceManager';
import { ServiceException } from '../../../common/exception/serviceException';
import { Tools } from '../../../common';
import { EntityState } from '../../data/EntityStateEnum';
import { IQueryParams } from './data/IQueryParams';

export class BaseDao implements IService {
  OnLoad(): void {}

  protected copyWhereParams<T extends IQueryParams>(params: T): T {
    const result: any = {};
    if (!params) {
      return result;
    }

    for (const key in params) {
      if (['pageIndex', 'pageSize', 'select', 'selectExclude', 'order', 'raw'].includes(key)) {
        continue;
      }

      if (!params[key]) {
        continue;
      }

      if (typeof params[key] === 'object') {
        // continue;
      }

      if (key.indexOf('Begin') > -1) {
        result[key.replace('Begin', '')] = {
          [Op.gt]: params[key],
        };
      } else if (key.indexOf('End') > -1) {
        result[key.replace('End', '')] = {
          [Op.gt]: params[key],
        };
      } else if (params[key] instanceof Array) {
        result[key] = {
          [Op.in]: params[key],
        };
      } else {
        result[key] = params[key];
      }
    }
    return result;
  }

  protected getQueryObject<T>(params: IQueryParams): FindOptions<T> {
    const qp: FindOptions<any> = {
      where: {
        ...this.copyWhereParams(params),
      },
      // raw: true
    };

    if (params) {
      if (params.pageSize) {
        qp.offset = (params.pageIndex - 1) * params.pageSize;
        qp.limit = params.pageSize * 1;
      }

      if (params.select && params.select.length > 0) {
        qp.attributes = params.select;
      }

      if (params.selectExclude && params.selectExclude.length > 0) {
        qp.attributes = { exclude: params.selectExclude };
      }

      if (params.order) {
        qp.order = params.order;
      }

      if (params.raw) {
        qp.raw = params.raw;
      }

      // if (params.orderByFields && params.orderByFields.length) {
      //     params.orderByType || (params.orderByType = 'AES');
      //     params.orderByFields.push(params.orderByType);
      //     qp.order = params.orderByFields;
      // }
    }

    return qp;
  }

  protected CopyEntity<T>(entity: T, target: T, options?: CopyEntityOption) {
    if (options && options.excludeFields) {
      options.excludeFields.forEach((field) => {
        delete entity[field];
      });
    }
    for (const key in entity) {
      if (key === 'id') continue;
      target[key] = entity[key];
    }
  }

  async GenerateSerialNo<T>(entity: T) {
    const seed = await (entity as any).count({
      where: {
        state: {
          [Op.ne]: EntityState.Deleted,
        },
      },
    });
    const serialNo = Tools.GenSerialNo(seed);
    return serialNo;
  }

  protected async CheckSerialNoExist<T>(serialNo: string, entity: T) {
    const count = await (entity as any).count({
      where: {
        serialNo,
        state: {
          [Op.ne]: EntityState.Deleted,
        },
      },
    });

    if (count > 0) {
      throw new ServiceException(`已经存在编号[${serialNo}]`);
    }
  }

  protected GenSearchKey<T>(p: T) {
    const list = [];
    for (const key in p) {
      list.push(`[${key}:${p[key]}]`);
    }

    return list.join('');
  }

  protected UpdateSearchKey<T>(source: string, p: T) {
    for (const key in p) {
      if (p[key]) {
        source = source.replace(new RegExp(`${key}:.*?]`), `${key}:${p[key]}]`);
      }
    }

    return source;
  }
}

interface CopyEntityOption {
  excludeFields: string[];
}
