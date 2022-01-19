/**
 * title     : 新增 link page
 * path      : /link-page
 * created at: 2022-1-10 10:55:17 ├F10: AM┤
 * updated at: 2022-1-10 10:55:17 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface PostLinkPageBody {
    linkPageTypeId: number;
    name: string;
    description: string;
    linkUrl: string;
    imgUrl: string;
}
export interface PostLinkPageResp {
    id: number;
}

export default function postLinkPage(body: PostLinkPageBody) {
  return ApiClient.httpPost<PostLinkPageResp>('/link-page', { body });
}
