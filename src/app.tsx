import { Component } from 'react';
import { Provider } from 'react-redux';

import configStore from '@/redux/store';

import './app.less';

const store = configStore();

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

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
