import { Lang } from '../../consts/lang';
import { enUSText } from './enUs';
import { zhCNText } from './zhCn';

export enum ErrorCode {
  Success = 0, // 历史原因，保留成功与服务器错误的错误码为0和1
  ServerError = 1,

  TooManyRequests = 10102,
  ParamBindError = 10103,
  AuthorizationError = 10104,
  UrlSignError = 10105,
  CacheSetError = 10106,
  CacheGetError = 10107,
  CacheDelError = 10108,
  CacheNotExist = 10109,
  ResubmitError = 10110,
  HashIdsEncodeError = 10111,
  HashIdsDecodeError = 10112,
  RBACError = 10113,
  RedisConnectError = 10114,
  MySQLConnectError = 10115,
  WriteConfigError = 10116,
  SendEmailError = 10117,
  MySQLExecError = 10118,
  NodeVersionError = 10119,
  SocketConnectError = 10120,
  SocketSendError = 10121,

  /**
   * WEB端
   */
  // 客户端-系统模块
  WEBMobileNotValidateError = 120101,
  WEBMobileVerificationError = 120102,
  WEBUserNameOrPasswordError = 120103,
  WEBMobileBeRegisteredError = 120104,
  WEBMobileNotRegisteredError = 120105,
  WEBXApiKeyError = 120106,
  WEBDomainError = 120107,
  WEBRequestMethodError = 120108,
  // 客户端-业务模块
  WEBParamsError = 120201,
  WEBDataNotExistError = 120202,
  // 服务端-系统模块
  WEBRequestTimeoutError = 110101,
  WEBServerError = 110102,

  /**
   * CMS端
   */
  // 客户端-系统模块
  CMSAccountOrPasswordError = 220101,
  CMSAccountNoAccessError = 220102,
  CMSAccountLoginInfoExpired = 220103,
  CMSXApiKeyError = 220104,
  CMSDomainError = 220105,
  CMSRequestMethodError = 220106,
  // 客户端-业务模块
  CMSParamsError = 220201,
  CMSNoAccessTODO = 220202,
  CMSDataNotExistError = 220203,
  CMSBindingProductCategoryError = 220204,
  CMSCreateProductRepeatError = 220205,
  // 服务端-系统模块
  CMSRequestTimeoutError = 210101,
  CMSServerError = 210102,
  // 服务端-业务模块
  CMSDataWriteInError = 210201,
  CMSDataEditError = 210202,
  CMSDataDeleteError = 210203,
  UploadPdfNotFinish = 210204,
  UploadPdfFail = 210205,
  UploadPdfNotFound = 210206,
}

export function code2Text(code: number, lang?: string): string {
  const textKey = ErrorCode[code];
  if (lang == Lang.ZhCn) {
    return zhCNText[textKey];
  }

  if (lang == Lang.EnUs) {
    return enUSText[textKey];
  }

  return zhCNText[textKey];
}
