/**
 * title     : 获取标签列表
 * path      : /web/tags
 * created at: 2022-1-10 10:55:27 ├F10: AM┤
 * updated at: 2022-1-10 10:55:27 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface GetWebTagsResp {
    name: string;
    total: number;
}

export default function getWebTags() {
  return ApiClient.httpGet<GetWebTagsResp[]>('/web/tags', { });
}
