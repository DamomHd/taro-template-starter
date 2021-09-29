import EnvCode from './env';

//
interface Config {
  baseApi: string;
  [key: string]: string;
}
const EnvConfig = {
  dev: {
    baseApi: 'https://www.baidu.com',
  },
  pro: {
    baseApi: 'https://www.baidu.com',
  },
};

export default (env = EnvCode.env): Config => EnvConfig[env];
