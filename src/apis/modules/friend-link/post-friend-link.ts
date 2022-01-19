/**
 * title     : 添加友链
 * path      : /friend-link
 * created at: 2022-1-10 10:55:26 ├F10: AM┤
 * updated at: 2022-1-10 10:55:26 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface PostFriendLinkBody {
    name: string;
    description: string;
    logoUrl: string;
    linkUrl: string;
}
export interface PostFriendLinkResp {
    id: number;
}

export default function postFriendLink(body: PostFriendLinkBody) {
  return ApiClient.httpPost<PostFriendLinkResp>('/friend-link', { body });
}
