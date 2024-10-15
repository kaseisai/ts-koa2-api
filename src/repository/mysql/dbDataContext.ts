import { Sequelize, Model } from 'sequelize-typescript';
import { Logger } from '../../common/utils/logger';
import { websiteConfig } from '../../common/configManager';

// 执行脚本时，尽量使用new的方式来实例化该类
export class DBDataContext {
  private static instance: DBDataContext | null = null;

  private conn: Sequelize;

  private logger: Logger;
  private domain: string;

  get Conn() {
    return this.conn;
  }

  constructor(domain: string) {
    this.domain = domain;
    this.logger = new Logger({
      category: 'DBDataContext',
    });

    this.logger.info({
      domain,
      dbConfig: websiteConfig.mysql,
    });
    const mysqlConfig = websiteConfig.mysql;

    this.conn = new Sequelize(mysqlConfig.database, mysqlConfig.user, mysqlConfig.password, {
      host: mysqlConfig.host,
      port: mysqlConfig.port,
      dialect: 'mysql',
      models: [`${__dirname}/models/*.*`],
      logging: process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'syncdb',
      pool: {
        max: 200,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      timezone: '+08:00',
    });

    this.logger.info('constructor DBDataContext');
  }

  // 单例模式是为同一套代码，在不同的网站上请求时，获取不同的数据库；在中间件中会每一次都会执行初始化，单例用于解决该问题
  static getInstance(domain: string): DBDataContext {
    const instance = DBDataContext.instance;
    if (!instance || (instance && instance.domain) !== domain) {
      console.log('<--------第一次初始化数据库----------->', domain);
      DBDataContext.instance = new DBDataContext(domain);
    }

    return DBDataContext.instance;
  }

  async GetTransaction() {
    return this.conn.transaction();
  }

  async SyncDB() {
    // await this.conn.sync({ force: true });
    try {
      await this.conn.sync({ alter: true });
    } catch (error) {
      console.error(error);
    }
  }

  async TestConnection() {
    try {
      await this.conn.authenticate();
      this.logger.info('Connection has been established successfully.');
    } catch (error) {
      this.logger.error('Unable to connect to the database:', error);
    }
  }
}
