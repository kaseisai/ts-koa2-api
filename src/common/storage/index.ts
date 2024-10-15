import { IStorage } from './IStorage';

export = require(`./${global.CONFIG.storage.type}`)(global.CONFIG.storage.options) as IStorage;
