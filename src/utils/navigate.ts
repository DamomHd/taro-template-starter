import Taro from '@tarojs/taro';
import { Pages, SubPages } from '@/app.router';
import { formatUrl } from './tools';
//  获取当前路由列表
const getCurrentRouteList = (): Array<any> => {
  const list = Taro.getCurrentPages() || [];
  return list.map((item) => ({
    path: `/${item.route}`,
    options: item.options,
  }));
};

// 获取当前 页面
const getCurrentRouter = () => {
  try {
    const list = getCurrentRouteList();
    const { path } = list[list.length - 1] || {};
    return path;
  } catch (error) {
    return undefined;
  }
};

export function navigateTo(path: SubPages, params: any = {}): void{
  if (path === getCurrentRouter()) {
    return;
  }
  const url = formatUrl(path, params);
  Taro.navigateTo({ url });
}

export function redirectTo(path: SubPages, params: any = {}): void{
  if (path === getCurrentRouter()) {
    return;
  }
  const url = formatUrl(path, params);
  Taro.redirectTo({ url });
}

export function switchTab(path: Pages, params: any = {}): void{
  const url = formatUrl(path, params);
  Taro.redirectTo({ url });
}

export function navigateBack(params: any = {}): void{
  Taro.navigateBack(params);
}

export function reLaunch(path: Pages | SubPages, params: any = {}): void{
  const url = formatUrl(path, params);
  Taro.reLaunch({ url });
}
