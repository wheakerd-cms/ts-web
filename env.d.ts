/// <reference types="vite/client" />
declare const __ROUTER_MODE__: 'host' | 'router';

declare module "*.vue" {
	import { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}