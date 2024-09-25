import '@/assets/main.scss';

import {createApp} from 'vue';
import App from '@/App.vue';

import pinia from '@/plugin/pinia';
import router from '@/router';

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');