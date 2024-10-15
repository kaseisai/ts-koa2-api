import path from 'path';
import * as fs from 'fs';

export const enum LoggerColor {
  red = '\x1B[31m',
  green = '\x1B[32m',
  yellow = '\x1B[33m',
  blue = '\x1B[34m',
}

interface ILoggerOptions {
  category?: string;
  color?: LoggerColor;
  level?: 'debug' | 'info' | 'warning' | 'error';
  fileOutputPath?: string;
  disable?: boolean;
}

export class Logger {
  constructor(private opt: ILoggerOptions) {
    this.opt.disable = process.env.NODE_ENV !== 'dev';
    this.opt.fileOutputPath = path.resolve(__dirname, `../../logs/${this.opt.category}.log`);
  }

  info(msg, ...args) {
    this.opt.color = LoggerColor.blue;
    return this.log('[INFO]', msg, ...args);
  }

  warn(msg, ...args) {
    this.opt.color = LoggerColor.yellow;
    return this.log('[WARNING]', msg, ...args);
  }

  error(msg, ...args) {
    this.opt.color = LoggerColor.red;
    return this.log('[ERROR]', msg, ...args);
  }

  private log(type: string, msg, ...args) {
    if (this.opt.disable) return;
    if (typeof msg === 'object') {
      msg = JSON.stringify(msg);
    }
    msg = `${type} ${msg}`;
    msg = this.getTime() + msg;
    if (this.opt.category) {
      msg = `[${this.opt.category}] ${msg}`;
    }

    msg = this.opt.color + msg;

    if (type === '[ERROR]') {
      console.error(msg, ...args);
    } else {
      console.log(msg, ...args);
    }

    if (this.opt.fileOutputPath) {
      fs.writeFile(this.opt.fileOutputPath, msg + '\n', { flag: 'a+' }, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  }

  private getTime() {
    const date = new Date();
    return `[${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;
  }
}
