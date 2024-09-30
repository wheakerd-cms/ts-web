// noinspection JSUnusedGlobalSymbols,DuplicatedCode

import {type RouteRecordRaw,} from "vue-router";
import {defineStore} from "pinia";
import {cloneDeep} from "lodash";
import {generateRoutes} from "@/modules/viewReader";
import {pinia} from "@/plugin/pinia";
import {getAppName, getLayoutView} from "@/modules/appReader";

interface StateInterface {
	addRoutes: RouteRecordRaw [];
	routes: RouteRecordRaw [];
	isAddRoutes: boolean;
}

export const useRouterStore = defineStore('base.router', {
	state: (): StateInterface => ({
		addRoutes: [] as RouteRecordRaw [],
		routes: [] as RouteRecordRaw [],
		isAddRoutes: false,
	}),
	getters: {
		getRouters(): RouteRecordRaw [] {
			return this.routes;
		},
		getAddRouters(): RouteRecordRaw [] {
			return this.addRoutes;
		},
		getIsAddRouters(): boolean {
			return this.isAddRoutes;
		},
	},
	actions: {
		initRoutes(routes?: RouteRecordRaw []): Promise<unknown> {
			if (!!routes) {
				this.setAddRouters(routes);
			}
			return new Promise<void>(async (resolve): Promise<void> => {
				const routers: RouteRecordRaw [] = generateRoutes(
					this.getAddRouters,
					getLayoutView(),
				);
				this.routes = cloneDeep(this.getAddRouters).concat(routers) as RouteRecordRaw [];
				resolve();
			});
		},
		setAddRouters(routes: RouteRecordRaw []): void {
			this.addRoutes = routes.concat([
				{
					path: '/:path(.*)*',
					redirect: '/404',
					name: 'NotFound',
				},
			] as unknown as RouteRecordRaw []);
		},
		setIsAddRouters(value: boolean): void {
			this.isAddRoutes = value;
		},
	},
	persist: {
		key: `base.router.${getAppName()}`,
		// key: `base.router.admin`,
		pick: [
			'addRoutes',
			'routes',
		],
	},
});

export const useRouterStoreWithout = () => {
	return useRouterStore(pinia);
};