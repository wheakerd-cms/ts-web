import "@/assets/main.scss";
import "element-plus/dist/index.css";

import {createApp, type App} from "vue";
import AppElement from "@/App.vue";

import {registryPinia} from "@/plugin/pinia";
import router from "@/router";

const app: App<Element> = createApp(AppElement);

registryPinia(app);

app.use(router);

app.mount('#app');