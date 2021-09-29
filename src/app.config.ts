//  tab主包页面地址
export enum Pages {
  Home = 'pages/index/index'
}
//  分包页面地址
export enum SubPages {
  Test = '/subPages/index/index'
}
const pages = Object.values(Pages);
const subPackages = Object.values(SubPages).map((path) => path.replace('/subPages/', ''));
export default {
  pages: [
    ...pages,
  ],
  subPackages: [
    {
      root: 'subPages',
      pages: [
        ...subPackages,
      ],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
};
