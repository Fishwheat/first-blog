import { createI18n } from 'vue-i18n';
import { storage } from '@/helpers/storage';

// interface Type { voiceVolume: number; oldVoiceVolume: number; languageType: string; }
const i18n = createI18n({
  locale: (storage as any).value.languageType,
  messages: {
    'zh-cn': require('./zh-cn'),
    'en-us': require('./en-us'),
  },
});

export default i18n;
