import * as sequelize from 'sequelize';
import { DBDataContext } from './dbDataContext';
import { baseConfig } from '../../common/configManager';

export async function Trans<T>(action: (t: sequelize.Transaction) => Promise<T>): Promise<T> {
  const dbDataContext = new DBDataContext(global.website);
  const t = await dbDataContext.GetTransaction();
  try {
    const result = await action.call(this, t);
    await t.commit();
    return result;
  } catch (error) {
    await t.rollback();
    throw error;
  }
}
