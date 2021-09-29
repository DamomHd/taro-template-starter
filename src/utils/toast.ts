import Taro from '@tarojs/taro';

interface ToastPorps {
  title: string;
  icon?: 'none' | 'success';
  duration: number;
}

interface LoadingProps {
  title: string;
  mask?: boolean;
}
export default class Modal {
  static toast(config: ToastPorps | string = { title: '', duration: 2000, icon: 'none' }): void {
    let duration = 2000;
    if (typeof config === 'string') {
      Taro.showToast({
        title: config,
        icon: 'none',
        duration,
      });
    } else {
      duration = config.duration || duration;
      Taro.showToast({
        title: config.title,
        icon: config.icon,
        duration,
      });
    }
  }

  static loading(config: LoadingProps = { title: '加载中...', mask: false }): void{
    Taro.showLoading({
      ...config,
    });
  }
}
