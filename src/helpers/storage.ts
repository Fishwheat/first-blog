// class StorageUtil {
//   static getLocalStorageItem(key: string) {
//     return JSON.parse(window.localStorage.getItem(key) ?? '');
//   }

//   static setLocalStorageItem(key: string, value: string) {
//     return window.localStorage.setItem(key, JSON.stringify(value));
//   }

//   static removeLocalStorageItem(key: string) {
//     return window.localStorage.removeItem(key);
//   }
// }
// export default StorageUtil;

// 引入vueuse上的本地存储
import { useStorage } from '@vueuse/core';

export const storage = useStorage('useStorage', {
  voiceVolume: 1, // 跟随用户对于音量的调整而变化
  oldVoiceVolume: 1, // 保留倒数第二份的数据，当用户点击音量icon时将音量归零，当再次点击时回到先前的音量
});
