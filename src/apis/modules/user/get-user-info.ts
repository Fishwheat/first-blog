/**
 * title     : 获取用户信息
 * path      : /user/info
 * created at: 2022-1-10 10:55:24 ├F10: AM┤
 * updated at: 2022-1-10 10:55:24 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface GetUserInfoResp {
    id: number;
    name: string;
    email: string;
}

export default function getUserInfo() {
  return ApiClient.httpGet<GetUserInfoResp>('/user/info', { });
}
