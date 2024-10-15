import { AuthException, ServiceException } from '../common/exception';

/**
 * ======================
 * resCode [Number]
 * 200 成功
 * 400 用户级别错误
 * 500 服务器级别错误
 * 511 校验级别错误
 */
export function pipe() {
    return async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            if (err instanceof AuthException) {
                ctx.status = 401;
            } else if (err instanceof ServiceException) {
                // 服务器业务异常
                ctx.status = 503;
            } else {
                // will only respond with JSON
                ctx.status = err.statusCode || err.status || 500;
                ctx.app.emit('error', err, ctx);
            }

            ctx.body = {
                message: err.message,
                errorCode: err.errorCode,
            };
        }
    };
}
