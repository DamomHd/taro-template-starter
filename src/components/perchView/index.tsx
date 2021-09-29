import Taro from '@tarojs/taro';
import { Component } from 'react';
import { View } from '@tarojs/components';
import './index.less';

interface IProps {
  backgroundColor?: string;
}

interface NullViewStatus {
  show: boolean;
}

export default class perchView extends Component<IProps, NullViewStatus> {
  constructor(props: any) {
    super(props);

    this.state = {
      show: false,
    };

    Taro.getSystemInfo().then((res:any) => {
      const {
        statusBarHeight, system, brand, isIphoneXSeries,
      } = res;

      if (isIphoneXSeries) {
        this.setState({
          show: true,
        });
      } else {
        const isIOS = (system && system.includes('iOS')) || (brand && brand.includes('iPhone'));
        if (isIOS) {
          this.setState({
            show: statusBarHeight !== 20 && statusBarHeight !== 24,
          });
        }
      }
    });
  }

  render(): JSX.Element {
    const { backgroundColor = '#ffffff' } = this.props;
    const { show } = this.state;
    const className = show ? 'perchViewShow' : 'perchViewUnshow';
    return (
      <View className={className} style={{ backgroundColor }} />
    );
  }
}
