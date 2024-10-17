import Koa from 'koa';
import Router = require('koa-router');
import bodyParser = require('koa-bodyparser');
import convert from 'koa-convert';
import path from 'path';
import compress from 'koa-compress';
import logger from 'koa-logger';
import koaBody from 'koa-body';
import serve from 'koa-static';
import fs from 'fs';

import { RouteManager } from './common';
import { pipe, cors } from './middleware';
import { addApiMethods, formatQueryData, setDomain } from './middleware/auth';
import { baseConfig, websiteConfig } from './common/configManager';

export class Server {
  private router: Router;

  private app: Koa;

  private hostName: any = '0.0.0.0';

  constructor() {
    this.app = new Koa();
    this.router = new Router();
    this.app.keys = ['some secret hurr']; // TODO: keys在config.json配置
    this.init();
  }

  /**
   * 初始化方法
   * 顺序必须为:
   * (1)Parser
   * (2)MiddleWares
   * (3)Routers
   */
  private async init() {
    RouteManager.Current.RegistRouteAdp(this.router);
    this.registerParser();
    this.registerMiddleWares();
    this.registerSession();
    this.registerRouters();
  }

  private registerSession() {
    const CONFIG = {
      key: 'dsg.sess' /** (string) cookie key (default is koa.sess) */,
      /** (number || 'session') maxAge in ms (default is 1 days) */
      /** 'session' will result in a cookie that expires when session/browser is closed */
      /** Warning: If a session cookie is stolen, this cookie will never expire */
      maxAge: 86400000,
      autoCommit: true /** (boolean) automatically commit headers (default true) */,
      overwrite: true /** (boolean) can overwrite or not (default true) */,
      httpOnly: true /** (boolean) httpOnly or not (default true) */,
      signed: true /** (boolean) signed or not (default true) */,
      rolling:
        false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
      renew:
        false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false) */,
      secure: false /** (boolean) secure cookie */,
      sameSite: null /** (string) session cookie sameSite options (default null, don't set it) */,
    };

    // this.app.use(session(CONFIG, this.app));
    // this.app.use(async (ctx: Koa.Context, next) => {
    //     await ctx.session.save();
    //     console.log(ctx.response.headers['set-cookie']);
    //     await next();
    // })
  }

  /**
   * http通信协议
   * (1)json
   * (2)form
   * (3)text
   */
  private registerParser() {
    this.app.use(
      koaBody({
        multipart: true,
        formidable: {
          // uploadDir: path.join(__dirname, '../public/upload'), // 设置文件上传目录
          uploadDir: baseConfig.storage.options.saveDir,
          // maxFileSize: 400 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
          onFileBegin: (name, file) => {
            // 无论是多文件还是单文件上传都会重复调用此函数
            // 最终要保存到的文件夹目录
            const dir = baseConfig.storage.options.saveDir;
            // 检查文件夹是否存在如果不存在则新建文件夹
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true });
            }
            // 文件名称去掉特殊字符但保留原始文件名称
            // const fileName = file.name.replaceAll(' ', '_').replace(/[`~!@#$%^&*()|\-=?;:'",<>\{\}\\\/]/gi, '_');
            // file.name = fileName;
            // // 覆盖文件存放的完整路径(保留原始名称)
            // file.path = `${dir}/${fileName}`;
          },
        },
      }),
    );
    this.app.use(
      bodyParser({
        extendTypes: {
          json: ['application/json'],
          form: ['application/x-www-form-urlencoded', 'multipart/form-data'],
          text: ['text/plain'],
        },
        jsonLimit: '50mb',
        formLimit: '50mb',
        strict: false,
        onerror: (err: any, ctx) => {
          err.status = err.status || 422;
          err.body = err.body ? `请求数据有误！请求格式为：${err.body}` : '请求数据有误！';
          const e = {
            code: err.status,
            msg: err.body,
          };
          ctx.throw(JSON.stringify(e), err.status);
        },
      }),
    );

    this.app.use(
      compress({
        filter(content_type) {
          return /json/i.test(content_type);
        },
        threshold: 2048 * 100,
        flush: require('zlib').Z_SYNC_FLUSH,
      }),
    );

    this.app.use(serve(path.join(__dirname, '../public')));
  }

  /**
   * 挂载中间件
   * cors：跨域
   * pipe：异常处理
   * logger：日志 , logger()
   */
  private registerMiddleWares() {
    this.app.use(
      convert.compose(
        cors(),
        pipe(),
        logger((str, args) => {
          console.log('http接口请求==>', str);
        }),
      ),
    );
    this.app.use(addApiMethods);
    this.app.use(formatQueryData);
    this.app.use(setDomain);
    this.app.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        global.logger.info({ msg: '进程出错--->', data: { stack: error.stack, message: error.message } });
        ctx.body = { code: error.code || 1, message: error.message || 'fail', data: {} };
      }
    });
  }

  /**
   * 挂载路由
   */
  private registerRouters() {
    RouteManager.Current.LoadRoutes();

    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());
  }

  /**
   * 启动服务
   * 默认端口：5700
   */
  async listen() {
    const maxListeners = Math.max(this.app.getMaxListeners() - 1, 0);
    this.app.setMaxListeners(maxListeners);
    console.log('事件监听数为：', maxListeners);

    // 监听 http
    const port = process.env.port || 5700;
    this.app.listen(port, this.hostName, () => {
      console.log(`http 服务器启动成功，监听端口： ${port}, in ${this.app.env} mode`);
    });
  }
}
