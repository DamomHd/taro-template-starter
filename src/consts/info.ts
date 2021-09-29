/*
 * @Author: your name
 * @Date: 2021-09-27 17:01:08
 * @LastEditTime: 2021-09-28 17:16:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /taro-flower/src/consts/info.ts
 */
import Taro from '@tarojs/taro';

const Info = {
  WEB: {
    appType: 'WEB',
  },
  WEAPP: {
    appType: 'WEAPP',
  },
  ALIPAY: {
    appType: 'ALIPAY',
  },
};

const currentInfo = {
  ...Info[Taro.getEnv()],
};

export default currentInfo;
