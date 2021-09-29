import Taro from '@tarojs/taro';

import configStore from '@/redux/store';
import HOST from '@/consts/host';

console.log(HOST);
interface RequestOptions {
  //  是否需要登录
  needLogin?: boolean;
  //  是否需要默认授权登录
  autoLogin?: boolean;
  //  接口异常是否弹窗msg
  showErrorToast?: boolean;
  //  超时时间
  timeout?: number;
  //  是否展示loading
  showLoading?: boolean;
  //  是否返回结果中的data字段 默认开启 关闭则返回所有状态结果
  isReturnData?: boolean;
  contentType?: string;
}

interface dataProps {
  [key: string]: any;
}

//  http状态码
enum HTTP_STATUS {
  SUCCESS = 200,
  CREATED = 201,
  ACCEPTED = 202,
  CLIENT_ERROR = 400,
  AUTHENTICATE = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

const Store = configStore();

const getCurrentState = (): any => {
  const store = Store;
  if (store) return store.getState();

  const nStore = configStore();
  return nStore ? nStore.getState() : {};
};
export default class Request {
  static base(url: string, data: any, method = 'POST', options: RequestOptions): Promise<any> {
    const {
      needLogin = true, showLoading = false, showErrorToast = true, timeout = 10000, isReturnData = true, contentType = 'application/json',
    } = options;

    const { counter = {} } = getCurrentState();
    console.log(counter);
    console.log(showErrorToast);
    console.log(timeout);
    if (needLogin) {
      //  处理需要登录逻辑
      console.log(needLogin);
    }

    if (showLoading) {
      //  处理等待逻辑
      console.log(showLoading);
    }
    const baseData = {
      ...data,
    };
    const baseOption: any = {
      url: `${url}`,
      data: baseData,
      dataType: 'json',
      header: {
        'content-type': contentType,
      },
      method,
    };

    return new Promise((resolve, reject) => {
      Taro.request({
        ...baseOption,
        success: (res) => {
          resolve(res);
        },
        fail: (error) => {
          reject(error);
        },
      });
    }).then((res: any): Promise<void> => {
      switch (res.statusCode) {
        case HTTP_STATUS.NOT_FOUND:
          return Promise.reject(new Error('请求资源不存在'));
        case HTTP_STATUS.BAD_GATEWAY:
          return Promise.reject(new Error('服务端出现了问题'));
        case res.statusCode === HTTP_STATUS.FORBIDDEN:
          Taro.setStorageSync('Authorization', '');
          // pageToLogin()
          // TODO 根据自身业务修改
          return Promise.reject(new Error('没有权限访问'));
        case HTTP_STATUS.AUTHENTICATE:
          Taro.setStorageSync('Authorization', '');
          // pageToLogin()
          return Promise.reject(new Error('需要鉴权'));
        case HTTP_STATUS.SUCCESS:
          return res.data;
        default:
          return Promise.reject(new Error('网络异常'));
      }
    }).then((res:any) => {
      const { code, message } = res;
      if (code) {
        return Promise.resolve(res);
      }
      const e:any = new Error(message);
      e.res = res;
      e.code = code;
      return Promise.reject(e);
    }).then((res:any = {}) => (isReturnData ? res.data : res))
      .catch((err: any) => {
        console.log(err);
      });
  }

  static post(url: string, data: dataProps = {}, option: RequestOptions = {}): Promise<any> {
    return this.base(url, data, 'POST', option);
  }

  static get(url: string, data: dataProps = {}, option: RequestOptions = {}): Promise<any> {
    return this.base(url, data, 'GET', option);
  }
}
