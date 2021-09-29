import host from '@/consts/host';
import Request from '@/utils/request';

const HOST = host().baseApi;
interface TestReusltProps {

}
export default class HomeApi {
  static test = <T = TestReusltProps>(params: {
    [key: string]:any;
  }): Promise<T> => Request.get(HOST, {
    ...params,
  }, {
    needLogin: true,
  });
}
