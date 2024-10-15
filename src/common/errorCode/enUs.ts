export const enUSText = {
  Success: 'Success',
  ServerError: 'Internal server error',
  TooManyRequests: 'Too many requests',
  ParamBindError: 'Parameter error',
  AuthorizationError: 'Authorization error',
  UrlSignError: 'URL signature error',
  CacheSetError: 'Failed to set cache',
  CacheGetError: 'Failed to get cache',
  CacheDelError: 'Failed to del cache',
  CacheNotExist: 'Cache does not exist',
  ResubmitError: 'Please do not submit repeatedly',
  HashIdsEncodeError: 'HashID encryption failed',
  HashIdsDecodeError: 'HashID decryption failed',
  RBACError: 'No access',
  RedisConnectError: 'Failed to connection Redis',
  MySQLConnectError: 'Failed to connection MySQL',
  WriteConfigError: 'Failed to write configuration file',
  SendEmailError: 'Failed to send mail',
  MySQLExecError: 'SQL execution failed',
  NodeVersionError: 'Node Version mismatch',
  SocketConnectError: 'Socket not connected',
  SocketSendError: 'Socket message sending failed',

  /**
   * WEB端
   */
  // 客户端-系统模块
  WEBMobileNotValidateError: 'The phone number is illegal',
  WEBMobileVerificationError: 'Verification code error',
  WEBUserNameOrPasswordError: 'The user name or password is incorrect',
  WEBMobileBeRegisteredError: 'The phone number has already been registered',
  WEBMobileNotRegisteredError: 'The phone number is not registered',
  WEBXApiKeyError: 'Request header X-Api-Key error',
  WEBDomainError: 'Request header domain error',
  WEBRequestMethodError: 'Request method error',
  // 客户端-业务模块
  WEBParamsError: 'Parameter error',
  WEBDataNotExistError: 'Data does not exist',
  // 服务端-系统模块
  WEBRequestTimeoutError: 'Request timeout',
  WEBServerError: 'Server error',

  /**
   * CMS端
   */
  // 客户端-系统模块
  CMSAccountOrPasswordError: 'The account or password is incorrect',
  CMSAccountNoAccessError: 'Account no access',
  CMSAccountLoginInfoExpired: 'Login information expired',
  CMSXApiKeyError: 'Request header X-Api-Key error',
  CMSDomainError: 'Request header domain error',
  CMSRequestMethodError: 'Request method error',
  // 客户端-业务模块
  CMSParamsError: 'Parameter error',
  CMSNoAccessTODO: 'Non-operational data',
  CMSDataNotExistError: 'Data does not exist',
  CMSBindingProductCategoryError: 'Binding product classification error',
  CMSCreateProductRepeatError: 'If you find a product with the same name and manufacturer, do not upload it twice',
  // 服务端-系统模块
  CMSRequestTimeoutError: 'Request timeout',
  CMSServerError: 'Server error',
  // 服务端-业务模块
  CMSDataWriteInError: 'Data write failure',
  CMSDataEditError: 'Data modification failure',
  CMSDataDeleteError: 'Data deletion failure',
  UploadPdfNotFinish: 'Upload pdf not finish',
  UploadPdfFail: 'Upload pdf fail',
  UploadPdfNotFound: 'Upload pdf not found',
};
