
const cloud = require('wx-server-sdk');
cloud.init()
async function getWXACode(event: any) {
  try {
      const res = await cloud.openapi.wxacode.getUnlimited({
          scene: 'x=1',
      });
      // 此处返回 Base64 图片仅作为演示用，在实际开发中，
      // 应上传图片至云文件存储，然后在小程序中通过云文件 ID 使用
      if (res.errCode === 0) {
          return {
              errCode: 0,
              errMsg: 'ok',
              qrcode: `data:${res.contentType};base64,${res.buffer.toString('base64')}`
          }
      } else {
          return res;
      }
  } catch (err) {
      return err
  }
}

exports.main = async (event :any) => {
  return getWXACode(event)
};