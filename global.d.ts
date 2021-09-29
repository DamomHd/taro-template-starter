declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.styl";

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd';
    [key: string]: any;
  }
}

declare const CODE_ENV: 'dev'|'pro';

// 给 window 上添加全局变量
interface Window { 
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function;
 }

//  定义全局 wx对象
 declare const wx: any;
// 定义全部或 my对象
 declare const my: any;