import crypto from 'crypto';

export function containsChinese(str: string): boolean {
  // 正则表达式匹配中文字符
  const reg = /[\u3400-\u4DBF\u4e00-\u9fff]/;
  return reg.test(str);
}

export function str2bool(str: string) {
  switch (str) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      throw new Error('Invalid boolean value');
  }
}

export function str2num(str: string) {
  switch (str) {
    case 'true':
      return 1;
    case 'false':
      return 0;
    default:
      throw new Error('Invalid boolean value');
  }
}

export function calculateHash(str: string) {
  return crypto.createHash('sha256').update(str).digest('hex');
}
