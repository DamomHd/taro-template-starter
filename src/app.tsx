import { Component } from 'react';
import { Provider } from 'react-redux';
import Taro from '@tarojs/taro';
import configStore from '@/redux/store';

import './app.less';

const store = configStore();

class App extends Component {
  componentDidMount() {
    this.updateApp()
    if(Taro.cloud) {
      Taro.cloud.init({
        env: 'xxyyzz', // 换成你的云函数环境
        traceUser: true // 是否要捕捉每个用户的访问记录。设置为true，用户可在管理端看到用户访问记录
      })
    }
    else {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

    /* 更新小程序 */
    updateApp () {
      if (Taro.canIUse('getUpdateManager')) {
        const updateManager = Taro.getUpdateManager()
        // updateManager.onCheckForUpdate(res => {
        //   // 请求完新版本信息的回调
        //   console.warn('onCheckForUpdate', res)
        // })
        updateManager.onUpdateReady(() => {
          Taro.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success (res: any) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            },
          })
        })
        updateManager.onUpdateFailed(() => {
          // 新版本下载失败
        })
      }
    }
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    const { children } = this.props;
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }
}

export default App;
