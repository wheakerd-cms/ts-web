import {createPinia} from 'pinia';
import PiniaPersistedState from 'pinia-plugin-persistedstate';
import type {App} from "vue";

const pinia = createPinia();

pinia.use(PiniaPersistedState);

export const registryStore = (app: App<Element>): void => {
	app.use(pinia);
};

export {pinia};