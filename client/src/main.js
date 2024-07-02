import { createApp } from 'vue';
import './index.css';
import App from './App.vue';
import router from './router';
import 'ant-design-vue/dist/reset.css';
import { notification } from 'ant-design-vue';

createApp(App).use(router).use(notification).mount('#app');
