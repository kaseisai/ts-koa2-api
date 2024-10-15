export class ApiKeyException extends Error {
  constructor() {
    super('接口验证失败!');
  }
}
