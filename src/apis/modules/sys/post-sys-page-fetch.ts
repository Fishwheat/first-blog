/**
 * title     : 更新前端文件
 * path      : /sys/page/fetch
 * created at: 2022-1-10 10:55:19 ├F10: AM┤
 * updated at: 2022-1-10 10:55:19 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export default function postSysPageFetch() {
  return ApiClient.httpPost<string[]>('/sys/page/fetch', { });
}
