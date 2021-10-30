import Taro from '@tarojs/taro';

interface ToastPorps {
  title: string;
  icon?: 'none' | 'success';
  duration: number;
  success?: () => Function;
  fail?: () => Function;
  complete?: () => Function;
}

interface LoadingProps {
  title: string;
  mask?: boolean;
}
import Taro from '@tarojs/taro';

interface ToastPorps {
  title: string;
  icon?: 'none' | 'success';
  duration: number;
  success?: () => Function;
  fail?: () => Function;
  complete?: () => Function;
}

interface LoadingProps {
  title: string;
  mask?: boolean;
}
export default class Modal {
  static toast(config: ToastPorps | string = {
    title: '', duration: 2000, icon: 'none',
  }): Promise<any> {
    let duration = 2000;
    if (typeof config === 'string') {
      return Taro.showToast({
        title: config,
        icon: 'none',
        duration,
      });
    }
    duration = config.duration || duration;
    return Taro.showToast({
      ...config,
      title: config.title,
      icon: config.icon,
      duration,
    });
  }

  static loading(config: LoadingProps = { title: '加载中...', mask: false }): void{
    Taro.showLoading({
      ...config,
    });
  }

  static hideLoading(): void{
    Taro.hideLoading();
  }

  static showModal(config: any):void{
    const successCallback = config.success;
    const cancelCallback = config.concel;
    Taro.showModal({
      title: config.title || '提示',
      content: config.content || '',
      success: (res) => {
        if (res.confirm) {
          if (successCallback && typeof successCallback === 'function') {
            successCallback();
          }
        } else if (cancelCallback && typeof cancelCallback === 'function') {
          cancelCallback();
        }
      },
      fail: () => cancelCallback && cancelCallback(),
    });
  }
}
