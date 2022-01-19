/**
 * title     : 保存系统信息
 * path      : /sys-info
 * created at: 2022-1-10 10:55:19 ├F10: AM┤
 * updated at: 2022-1-10 10:55:19 ├F10: AM┤
 */
import ApiClient from '../../api-client';

export interface PutSysInfoBody {
    baseUrl: string;
    siteName: string; // 网站名称
    mittBeian: string; // 备案号
    publicBeian: string; // 网安备案号
    copyright: string; // 版权信息
}

export default function putSysInfo(body: PutSysInfoBody) {
  return ApiClient.httpPut<boolean>('/sys-info', { body });
}
