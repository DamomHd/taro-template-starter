import { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button, Text } from '@tarojs/components';

import { add, minus, asyncAdd } from '@/redux/actions/counter';

import './index.less';

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number;
  };
};

type PageDispatchProps = {
  addTest: () => Function;
  dec: () => Function;
  asyncAddTest: () => Function;
};

type PageOwnProps = {};

// type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;
class Index extends Component<IProps> {
  // componentWillReceiveProps(nextProps) {
  //   console.log(this.props, nextProps);
  // }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const {
      addTest, dec, asyncAddTest, counter,
    } = this.props;
    return (
      <View className="index">
        <Button className="add_btn" onClick={addTest}>+</Button>
        <Button className="dec_btn" onClick={dec}>-</Button>
        <Button className="dec_btn" onClick={asyncAddTest}>async</Button>
        <View><Text>{counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
      </View>
    );
  }
}

const mapStateToProps = ({ counter }) => ({
  counter,
});

const mapDispatchToProps = (dispatch) => ({
  addTest: () => dispatch(add()),
  dec: () => dispatch(minus()),
  asyncAddTest: () => dispatch(asyncAdd()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
