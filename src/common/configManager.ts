import * as path from 'path';
import { Logger } from './utils/logger';
import YAML = require('yamljs');
import { getEnv } from './utils/env';

export class ConfigManager {
  static current: ConfigManager = new ConfigManager();

  private config: IGlobalConfig;

  private logger: Logger;

  constructor() {
    this.logger = new Logger({
      category: 'ConfigManager',
    });
  }

  Load(configPath?: string) {
    // base config
    const baseConfig = YAML.load(path.resolve(__dirname, '..', '..', 'configs', `config.${getEnv}.yaml`));
    // domain config
    const websiteConfig = YAML.load(path.resolve(__dirname, '..', '..', 'configs', `config-${global.website}.yaml`));

    this.config = { ...baseConfig, ...websiteConfig };
    if (configPath) {
      const cfg = require(path.resolve(configPath));
      for (const key in cfg) {
        this.config[key] = cfg[key];
      }
    }

    global.CONFIG || (global.CONFIG = {});
    this.logger.info(this.config);
  }

  GetConfig(configPath?: string) {
    if (!this.config) {
      ConfigManager.current.Load(configPath);
    }
    return this.config;
  }
}

export interface IGlobalConfig {
  baseConfig: {
    env?: string;
    lang: string;
    xApiKey: string;
    connectDB?: boolean;
    clsNamespace: string;
    accessLogPath: string;
    dmsHost: string;
    storage: {
      type: string;
      options: {
        saveDir: string;
      };
      tencentOss: {
        SecretId: string;
        SecretKey: string;
      };
    };
    email: {
      enable: boolean;
      idocEnable: boolean;
      host: string;
      port: number;
      user: string;
      password: string;
      from: string;
      replyTo: string;
      idocHost: string;
    };
    apiRedisHashKey: string;
    proxy: { source: string; target: string; prefix: string }[];
    allControllers?: string;
    controllers: { path: string }[];
    services: { name: string; path: string }[];
    serviceDirs: string[];

    dataSourcePath: string;
    translate: {
      youdao: {
        appKey: string;
        appSecret: string;
      };
      deepl: {
        appKey: string;
      };
    };
    openAi: {
      aiApi: string;
      azureOpenAi: {
        endPoint: string;
        apiKey: string;
        deploymentId: string;
      };
      googleOpenAi: {
        apiKey: string;
        apiKey1?: string;
      };
      chatOpenAi: {
        apiKey: string;
      };
      mockOpenAi?: boolean;
    };

    baiduLinkSubmit?: {
      url: string;
      oe1Token: string;
    };
    es: {
      host: string;
      productMinScore: number;
      paramsMinScore: number;
      useEs: boolean;
    };
    wechat: {
      appId: string;
      appSecret: string;
      miniAppId: string;
      miniAppSecret: string;
    };
    sms: {
      secretId: string;
      secretKey: string;
      smsSdkAppId: string;
    };
    webhook: string;
  };
  websiteConfig: {
    connectDB?: boolean;
    website: {
      baseName: string;
    };
    baseUrl: string;
    baseApiUrl: string;
    redis: {
      host: string;
      port: number;
      db: number;
    };
    mysql: {
      connectionLimit: number;
      host: string;
      user: string;
      password: string;
      database: string;
      charset: string;
      collate: string;
      port: number;
    };
    searchEngine: {
      baidu: {
        url: string;
        apikey: string;
        limit: number;
      };
      bing: {
        url: string;
        apikey: string;
        limit: number;
      };
      google: {
        url: string;
        apikey: string;
        limit: number;
      };
    };
  };
}

export const config = ConfigManager.current.GetConfig();
export const baseConfig = config.baseConfig;
export const websiteConfig = config.websiteConfig;
