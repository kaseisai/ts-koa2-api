export const zhCNText = {
  Success: '成功',
  ServerError: '内部服务器错误',
  TooManyRequests: '请求过多',
  ParamBindError: '参数信息错误',
  AuthorizationError: '签名信息错误',
  UrlSignError: '参数签名错误',
  CacheSetError: '设置缓存失败',
  CacheGetError: '获取缓存失败',
  CacheDelError: '删除缓存失败',
  CacheNotExist: '缓存不存在',
  ResubmitError: '请勿重复提交',
  HashIdsEncodeError: 'HashID 加密失败',
  HashIdsDecodeError: 'HashID 解密失败',
  RBACError: '暂无访问权限',
  RedisConnectError: 'Redis 连接失败',
  MySQLConnectError: 'MySQL 连接失败',
  WriteConfigError: '写入配置文件失败',
  SendEmailError: '发送邮件失败',
  MySQLExecError: 'SQL 执行失败',
  NodeVersionError: 'Node 版本不满足要求',
  SocketConnectError: 'Socket 未连接',
  SocketSendError: 'Socket 消息发送失败',

  /**
   * WEB端
   */
  // 客户端-系统模块
  WEBMobileNotValidateError: '手机号码不合法',
  WEBMobileVerificationError: '验证码错误',
  WEBUserNameOrPasswordError: '用户名或密码错误',
  WEBMobileBeRegisteredError: '该手机号码已经被注册',
  WEBMobileNotRegisteredError: '该手机号码未注册',
  WEBXApiKeyError: '请求头X-Api-Key错误',
  WEBDomainError: '请求头domain错误',
  WEBRequestMethodError: '请求方法错误',
  // 客户端-业务模块
  WEBParamsError: '参数错误',
  WEBDataNotExistError: '数据不存在',
  // 服务端-系统模块
  WEBRequestTimeoutError: '请求超时',
  WEBServerError: '服务器错误',

  /**
   * CMS端
   */
  // 客户端-系统模块
  CMSAccountOrPasswordError: '账号或密码错误',
  CMSAccountNoAccessError: '账号无权访问',
  CMSAccountLoginInfoExpired: '登录信息过期',
  CMSXApiKeyError: '请求头X-Api-Key错误',
  CMSDomainError: '请求头domain错误',
  CMSRequestMethodError: '请求方法错误',
  // 客户端-业务模块
  CMSParamsError: '参数错误',
  CMSNoAccessTODO: '无权操作数据',
  CMSDataNotExistError: '数据不存在',
  CMSBindingProductCategoryError: '绑定产品分类出错',
  CMSCreateProductRepeatError: '找到同名且同厂家的产品，请勿重复上传',
  // 服务端-系统模块
  CMSRequestTimeoutError: '请求超时',
  CMSServerError: '服务器错误',
  // 服务端-业务模块
  CMSDataWriteInError: '数据写入失败',
  CMSDataEditError: '数据修改失败',
  CMSDataDeleteError: '数据删除失败',
  UploadPdfNotFinish: '未完成pdf上传解析',
  UploadPdfFail: 'pdf上传解析失败',
  UploadPdfNotFound: '未找到对应的pdf上传',
};
