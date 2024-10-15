import { baseConfig } from './configManager';

// SECRETID 和 SECRETKEY 请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
const COS = require('cos-nodejs-sdk-v5');

const config = baseConfig;

const cos = new COS({
  SecretId: config.storage.tencentOss.SecretId, // 推荐使用环境变量获取；用户的 SecretId，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
  SecretKey: config.storage.tencentOss.SecretKey, // 推荐使用环境变量获取；用户的 SecretKey，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
});

export async function upload2TencentOss(key: string, filePath: string) {
  // 这里省略初始化过程和上传参数
  try {
    const data = await cos.uploadFile({
      Bucket: 'oe1-1309271250' /* 填入您自己的存储桶，必须字段 */,
      Region: 'ap-shanghai' /* 存储桶所在地域，例如 ap-beijing，必须字段 */,
      Key: key /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
      FilePath: filePath, // 上传文件路径
      onProgress: function (progressData) {
        console.log(JSON.stringify(progressData));
      },
      onFileFinish: function (err, data, options) {
        /* 非必须 */
        console.log(options.Key + '上传' + (err ? '失败' : '完成'));
      },
    });
    console.log('上传成功', data);
    return { err: null, data };
  } catch (err) {
    console.log('上传出错', err);
    return { err, data: null };
  }
}
