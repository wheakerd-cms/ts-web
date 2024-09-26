import "@/assets/main.scss";
import "element-plus/dist/index.css";

import {createApp, type App} from "vue";
import AppElement from "@/App.vue";

import ElementPlus from "element-plus";
import {registryStore} from "@/plugin/pinia";
import router from "@/router";

const app: App<Element> = createApp(AppElement);

registryStore(app);

app.use(ElementPlus);
app.use(router);

app.mount('#app');