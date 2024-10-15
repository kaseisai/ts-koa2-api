global.website = process.env.website;
global.websiteType = process.env.websiteType;

import { initLogger } from '../common/utils/log';
import { DBDataContext } from '../repository/mysql/dbDataContext';

// 初始化日志
initLogger({ appName: `dms-api-${global.website}` });

// 脚本入口，新增脚本中需要引入require('../start/main')，否则无法使用service db
async function main() {
  const dbDataContext = new DBDataContext(global.website);
  DBDataContext.getInstance(global.website);
  await dbDataContext.TestConnection();
}

main();
