import { createApp } from 'vue';
// import ElementUI from 'element-ui';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';
// import './theme'; // 更换主题
// import locale from '/element-ui/lib/locale/lang/zh-CN';
// import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
// import ApiClient from './apis/api-client';
import VueI18n from './language';

// ApiClient.setInstance(axios.create({
//   baseURL: '/api',
// }));

const app = createApp(App);
app.use(ElementPlus, { locale: zhCn });
app.use(store).use(router).use(VueI18n).mount('#app');
// app.use(ElementPlus, { locale });
