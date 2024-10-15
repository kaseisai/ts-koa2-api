import Joi from 'joi';
import Koa from 'koa';
import { ErrorCode } from '../common/errorCode/code';

export const validateParams = (schema: Joi.Schema) => async (ctx: Koa.Context, next: Function) => {
  let data: any;
  if (ctx.method === 'GET') {
    data = ctx.request.query;
  } else {
    data = ctx.request.body;
  }

  let checkError: any;
  // body可能是数组
  if (data.length) {
    data.forEach((bodyVal: any) => {
      const { error } = schema.validate(bodyVal);
      if (error) {
        checkError = error;
      }
    });
  } else {
    const { error } = schema.validate(data);
    if (error) {
      checkError = error;
    }
  }
  if (checkError) {
    ctx.body = {
      code: ErrorCode.ParamBindError,
      message: checkError.message,
    };
    return;
  }

  return await next();
};

export const validateFormDataBodyParams = (schema: Joi.Schema) => async (ctx: Koa.Context, next: Function) => {
  const { fields } = ctx.request.body as any;
  const { error } = schema.validate(fields);
  if (error) {
    ctx.body = {
      code: ErrorCode.ParamBindError,
      message: error.message,
    };
    return;
  }
  return await next();
};
