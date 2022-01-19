/**
 * title     : 新增链接页类型
 * path      : /link-page-type
 * created at: 2022-1-10 10:55:15 ├F10: AM┤
 * updated at: 2022-1-10 10:55:15 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface PostLinkPageTypeBody {
    name: string;
    linkName: string;
    description: string;
}
export interface PostLinkPageTypeResp {
    id: number;
}

export default function postLinkPageType(body: PostLinkPageTypeBody) {
  return ApiClient.httpPost<PostLinkPageTypeResp>('/link-page-type', { body });
}
