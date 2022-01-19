import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import ApiClient from './apis/api-client';

ApiClient.setInstance(axios.create({
  baseURL: '/api',
}));

createApp(App).use(store).use(router).mount('#app');
