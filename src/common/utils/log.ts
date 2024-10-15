/*
 * log具有如下功能：
 * 1. 可添加request id，且大并发时，每个请求的request id不会混淆
 * 2. 可格式化日志输出内容
 * 3. 可分类型存储日志，例如按业务日志、数据库日志存储等
 * 4. 可自动压缩日志文件、按日期命名、可配置保留时间等
 * 5. 可打印纯粹的日志，例如log.info({data: xxx})，纯粹日志就只包含{data: xxx}，不包含request id，level等
 * 6. log使用方法：log.info, log.info, log.getChild, log.getChild等，导出的logger对象为 log
 */

import safeStringify from 'fast-safe-stringify';
import * as _ from 'lodash';
import moment from 'moment';
import path from 'path';
import fs from 'fs';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { createLogger, format } = winston;
const { combine, timestamp, printf } = format;

const isProduction = process.env.NODE_ENV === 'production';

const enum IS_NEW_LOG {
  TRUE = 1,
  FALSE = 0,
}

const config = {
  appName: '',
  category: 'biz',
  level: process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug'),
};

// 日志输出路径
function getLogPath() {
  const logPath = path.join(__dirname, '../../logs');
  fs.mkdirSync(logPath, { recursive: true });

  return logPath;
}

// 包裹一次log输出方法，将log输出内容都包裹到data中去
function wrapLogger(logger: winston.Logger) {
  const levels = ['debug', 'info', 'warn', 'error'];
  levels.forEach((level) => {
    logger[level] = (logData: any, ...params: any) => {
      if (typeof logData === 'string' && params.length) {
        logData = logData + ' ' + params.join(' ');
      }
      logger.log({
        level,
        message: logData,
      });
    };
  });
  return logger;
}

/**
 * 格式化输出参数，如果要新增参数，需要在此调整。
 * 如果只打印原始数据，不需要requestId，categoryName，AppName等，则使用下述方法
 * return safeStringify({
 *   data: args.message
 * });
 */
const myFormat = printf((args: any) => {
  const string = safeStringify({
    requestId: _.get(args.message, 'requestId'),
    // categoryName: args.categoryName,
    // level: args.level,
    isNewLog: _.get(args.message, 'isNewLog'),
    appName: args.appName,
    date: moment(args.timestamp).format('YYYY-MM-DD HH:mm:ss.SSS'),
    message: _.get(args.message, 'message') || _.get(args.message, 'msg') || args.message,
    data: _.get(args.message, 'data') || {},
    error: (args.message && args.message.error) || '',
  });
  return string;
});

function getLogger(options: { category: string; level: string }) {
  const transport: DailyRotateFile = new DailyRotateFile({
    filename: path.join(getLogPath(), `${config.appName}.${options.category}.%DATE%.log`), // 文件格式
    datePattern: 'YYYY-MM-DD', // 按天分割文件
    zippedArchive: true, // 压缩
    maxSize: '100m', // 单个文件最大20M
    maxFiles: '15d', // 文件保存15天
  });
  transport.on('rotate', (oldFilename: string, newFilename: string) => {
    // 日志分割时间触发
  });

  const logger = createLogger({
    level: options.level,
    defaultMeta: { appName: config.appName, categoryName: options.category },
    format: combine(timestamp(), myFormat),
    transports: [transport],
  });

  // 日志打印到stdout
  if (!isProduction) {
    logger.add(new winston.transports.Console());
  }

  logger.child = (options: winston.Logger) => {
    return wrapLogger(logger.child(options));
  };

  return wrapLogger(logger);
}

// 测试环境要打印成console的方式，取消注释
if (!isProduction) {
  // logger.debug = console.log as winston.LeveledLogMethod;
  // logger.info = console.log as winston.LeveledLogMethod;
  // logger.error = console.log as winston.LeveledLogMethod;
}

export function initLogger(cfg: { appName: string; category?: string; level?: string }) {
  config.appName = cfg.appName;
  config.category = cfg.category || config.category;
  config.level = cfg.level || config.level;

  global.logger = getLogger({ category: config.category, level: config.level });
}

//保留，没有init的情况日志也可用
// global.logger = getLogger({ category: config.category, level: config.level });

// 测试环境要打印成console的方式，取消注释
if (!isProduction) {
  // global.logger.debug = console.log as winston.LeveledLogMethod;
  // global.logger.info = console.log as winston.LeveledLogMethod;
  // global.logger.error = console.error as winston.LeveledLogMethod;
}
