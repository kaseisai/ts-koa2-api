export interface IStorage {
    getStorageType(): string;

    getUploadFileName(filename: string): string;

    getCDNURL(key: string): string;

    uploadFile(
        key: string,
        filePathOrFileObject: string | Buffer,
        options?: any,
        publicAccess?: boolean,
    ): Promise<{ name: string; key: string; URL: string }>;

    copyFile(src: string, key: string): Promise<{ name: string; key: string; URL: string }>;
}
