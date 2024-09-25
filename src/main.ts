import '@/assets/main.scss';
import 'element-plus/dist/index.css';

import {createApp, type App} from 'vue';
import AppElement from '@/App.vue';

import ElementPlus from 'element-plus';
import pinia from '@/plugin/pinia';
import router from '@/router';

const app: App<Element> = createApp(AppElement);

app.use(ElementPlus);
app.use(pinia);
app.use(router);

app.mount('#app');