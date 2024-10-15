export enum UploadStatus {
  READY = 'ready',
  SUCCESS = 'success',
  FAIL = 'fail',
}

export const statusCacheKey = (key: string) => {
  return `${key}-status`;
};

export const statusCacheRes = (key: string) => {
  return `${key}-res`;
};
