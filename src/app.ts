global.website = process.env.website;

import { initLogger } from './common/utils/log';

// 初始化日志
initLogger({ appName: `dms-api-${global.website}` });

import { Server } from './server';

declare module 'koa' {
  interface Context {
    currentUser: { userID: string };
    sendApiRes: <T>(result?: T, code?: number) => void;
    i18n: (key: string, ...args: any) => string;
  }
}

const app = new Server();
app.listen();

process.on('uncaughtException', (err) => {
  console.error('Unexpected Exception：', err);
});
