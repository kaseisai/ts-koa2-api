export class AuthException extends Error {
    constructor() {
        super('登录异常，没有登录！');
    }
}
