import {defineStore} from "pinia";
import appConfig from "@/config/app";
import {createRouter, createWebHistory, type Router,} from "vue-router";
import {routerModules, viewModules} from "@/config/modules";
import {pinia} from "@/plugin/pinia";
import type {ReturnTypeRouter} from "@/config/types";

interface StateInterface {
	mode: string;
	href: string;
	appName: null | string | undefined;
	defaultRoute: { [key: string]: any },
}

const {
	hasRouterModule,
	getRouterModule,
} = routerModules();

export const useAppStore = defineStore('base.app', {
	state: (): StateInterface => ({
		mode: import.meta.env.VITE_ROUTER_MODE,
		href: window.location.href,
		appName: null,
		defaultRoute: [
			{
				path: '/404',
				name: '404',
				component: `${appConfig.pages ['404']}`,
			},
			{
				path: '/:pathMatch(.*)*',
				name: 'NotFound',
				redirect: '/404',
			}
		],
	}),
	getters: {
		getPath(): undefined | string {
			const match: RegExp = /.*:\/{2}([^.:]*).*?\/([^\/]*)\/?/gm;
			const matchReg: RegExpExecArray | null = new RegExp(match).exec(this.href);
			return this.mode === 'host' ? matchReg?. [2] : matchReg ?. [1];
		},
		getAppName(): string | undefined {
			if (null === this.appName) {
				const appName: string | undefined = this.getPath;
				this.appName = !!appName ? appName : appConfig.app [appConfig.defaultApp]?.base;
			}
			return this.appName;
		},
		getLayoutView(): ReturnTypeRouter<any> {
			return appConfig.app [this.getAppName as string].layout as ReturnTypeRouter<any>;
		},
		getDefaultRoute(): Router {
			const {generateRoutes} = viewModules();
			const routes = generateRoutes(this.defaultRoute);

			return createRouter({
				history: createWebHistory(),
				routes: routes,
			});
		},
		async getRouter(): Promise<Router> {
			const app: string | undefined = this.getAppName;
			console.log(app);

			return !!app && hasRouterModule(app) ? await getRouterModule(app) : this.getDefaultRoute;
		},
	},
	persist: false,
});

export const useAppStoreWithout = () => {
	return useAppStore(pinia);
};