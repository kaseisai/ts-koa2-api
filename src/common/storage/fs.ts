import * as path from 'path';
import * as fs from 'fs';
import { IStorage } from './IStorage';

const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const fse = require('fs-extra');
const uuidv1 = require('uuid/v1');

interface fsOptions {
    saveDir: string;
}
const padLeft = (v: number) => (v < 10 ? `0${v}` : `${v}`);
class FS implements IStorage {
    private options: fsOptions;

    constructor(options: fsOptions) {
        this.options = options;
    }

    getStorageType(): string {
        return 'fs';
    }

    currentDate(): string {
        const now = new Date();
        return `${now.getFullYear()}-${padLeft(now.getMonth() + 1)}-${padLeft(now.getDate())}`;
    }

    getUploadFileName(filename: string): string {
        const extname = path.extname(filename);
        return ['resource', this.currentDate(), uuidv1() + extname].join('/');
    }

    getLocalPath(key: string) {
        return path.join(this.options.saveDir, key);
    }

    getCDNURL(key: string) {
        if (!key) {
            return '';
        }
        if (key.startsWith('/')) {
            return key;
        }
        return `/${key}`;
    }

    async copyFile(src: string, key: string) {
        const filePath = this.getLocalPath(key);
        const dirPath = path.dirname(filePath);
        if (!fs.existsSync(dirPath)) {
            fse.mkdirpSync(path.dirname(filePath));
        }

        if (fs.existsSync(filePath)) {
            return;
        }
        fs.copyFileSync(src, filePath);

        const url = this.getCDNURL(key);

        return {
            name: path.basename(key),
            key,
            URL: url,
        };
    }

    /**
     * 写入文件
     * @param key
     * @param data
     * @returns {Promise<void>}
     */
    async writeFile(key: string, data: any) {
        const filePath = this.getLocalPath(key);
        fse.mkdirpSync(path.dirname(filePath));
        // 修正文件写入异步问题。
        fs.writeFileSync(filePath, data);

        const url = this.getCDNURL(key);

        return {
            name: path.basename(key),
            key,
            URL: url,
        };
    }

    /**
     * 保持storageSrv结构，所以这里加上了。
     * @param key
     * @param data
     * @param options 用来占位
     * @param publicAccess 用来占位
     * @returns {Promise<void>}
     */
    async uploadFile(key: string, file: string | Buffer, options: any = null, publicAccess: boolean = true) {
        let data = file;
        if (typeof file === 'string') {
            data = await readFile(data);
        }
        return this.writeFile(key, data);
    }
}

export = (options: fsOptions) => new FS(options);
