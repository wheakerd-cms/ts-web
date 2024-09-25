import {createPinia} from 'pinia';
import PiniaPersistedState from 'pinia-plugin-persistedstate';

const pinia = createPinia();

pinia.use(PiniaPersistedState);

export default pinia;