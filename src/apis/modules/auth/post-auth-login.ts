/**
 * title     : 用户登录
 * path      : /auth/login
 * created at: 2022-1-10 10:55:24 ├F10: AM┤
 * updated at: 2022-1-10 10:55:24 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface PostAuthLoginBody {
    loginName: string;
    password: string;
}
export interface PostAuthLoginResp {
    token: string;
    userId: number;
}

export default function postAuthLogin(body: PostAuthLoginBody) {
  return ApiClient.httpPost<PostAuthLoginResp>('/auth/login', { body });
}
