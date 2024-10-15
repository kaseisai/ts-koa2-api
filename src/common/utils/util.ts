const mime = require('mime-types');

export function asyncPromise<T>(p: Promise<T>): void {
  p.then(() => {}).catch((e) => {
    throw e;
  });
}

export function extFromMime(type: string): string {
  const extName: string = mime.lookup(type);

  return '.' + extName;
}

export function pick(obj: object, props: string[]): any {
  const result = {};
  const keys = Object.keys(obj);
  for (const key of keys) {
    if (props.includes(key)) {
      result[key] = obj[key];
    }
  }

  return result;
}
