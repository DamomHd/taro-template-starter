import Taro from '@tarojs/taro';

const cache: any = {};
enum STOTE_KEYS {
  UserInfo = 'USER_INFO'
}
export default class Store {
  static setStorage(key: STOTE_KEYS, value: any): Promise<Object> {
    return new Promise((resolve, reject) => {
      Taro.setStorage({
        key,
        data: JSON.stringify(value),
        success: () => {
          cache[key] = value;
          resolve({ key, value });
        },
        fail: (err) => reject(err),
      });
    });
  }

  static getStorage(key: STOTE_KEYS): Promise<any> {
    if (cache[key]) return Promise.resolve(cache[key]);
    return new Promise((resolve, reject) => {
      Taro.getStorage({
        key,
        success: (res) => {
          const val = JSON.parse(res.data);
          cache[key] = val;
          resolve(val);
        },
        fail: () => reject(),
      });
    });
  }

  static setStorageSync(key: STOTE_KEYS, value: any): void {
    try {
      Taro.setStorageSync(key, JSON.stringify(value));
      cache[key] = value;
    } catch (e) {
      throw new Error(e);
    }
  }

  static getStorageSync(key: STOTE_KEYS): any {
    if (cache[key]) return { state: true, data: cache[key] };
    try {
      const value = Taro.getStorageSync(key);
      if (value) {
        return {
          state: true,
          data: JSON.parse(value),
        };
        // Do something with return value
      }
      return {
        state: false,
        data: null,
      };
    } catch (e) {
      // Do something when catch error
      return {
        state: false,
        data: null,
      };
    }
  }

  static removeStorage(key: STOTE_KEYS): Promise<any> {
    return new Promise((reslove, reject) => {
      Taro.removeStorage({
        key,
        success: () => {
          cache[key] = undefined;
          reslove(key);
        },
        fail: (error) => {
          reject(error);
        },
      });
    });
  }

  static removeStorageSync(key: STOTE_KEYS): boolean {
    try {
      Taro.removeStorageSync(key);
      cache[key] = undefined;
      return true;
    } catch (e) {
      return false;
    }
  }

  static clearStorage(): Promise<any> {
    return new Promise((resolve, reject) => {
      Taro.clearStorage({
        success: () => {
          Object.keys(cache).forEach((key) => {
            cache[key] = undefined;
          });
          resolve(true);
        },
        fail: () => reject(new Error(undefined)),
      });
    });
  }

  static clearStorageSync(): boolean {
    try {
      Taro.clearStorageSync();
      Object.keys(cache).forEach((key) => {
        cache[key] = undefined;
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}
