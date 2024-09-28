import {defineStore} from "pinia";
import type {RouteRecordRaw} from "vue-router";
import {pinia} from "@/plugin/pinia";
import {baseRouter} from "@/app/admin/router";
import {cloneDeep} from "lodash";
import {type ReturnTypeRouter, viewModules} from "@/stores/modules";

interface stateInterface {
	routers: RouteRecordRaw [];
	addRouters: RouteRecordRaw [];
	isAddRouters: boolean;
}

const LayoutView: ReturnTypeRouter<any> = () => import('@/app/admin/views/LayoutView.vue');

const {
	generateRoutes,
} = viewModules();

export const usePermissionsStore = defineStore('admin.permission', {
	state: (): stateInterface => ({
		routers: [] as RouteRecordRaw [],
		addRouters: [] as RouteRecordRaw [],
		isAddRouters: false,
	}),
	getters: {
		getRouters(): RouteRecordRaw [] {
			return this.routers;
		},
		getAddRouters(): RouteRecordRaw [] {
			return this.addRouters;
		},
		getIsAddRouters(): boolean {
			return this.isAddRouters;
		},
	},
	actions: {
		initRoutes(routes: RouteRecordRaw []): Promise<unknown> {
			return new Promise<void>(async (resolve): Promise<void> => {
				const routers: RouteRecordRaw [] = generateRoutes(routes, LayoutView);
				this.routers = cloneDeep(baseRouter).concat(routers) as RouteRecordRaw [];
				resolve();
			});
		},
		setAddRouters(routes: RouteRecordRaw []): void {
			this.addRouters = routes.concat([
				{
					path: '/:path(.*)*',
					redirect: '/404',
					name: 'NotFound',
				},
			] as unknown as RouteRecordRaw []);
		},
		setIsAddRouters(value: boolean): void {
			this.isAddRouters = value;
		},
	},
	persist: {
		pick: [
			'addRouters',
		],
	},
});

export const usePermissionsStoreWithout = () => {
	return usePermissionsStore(pinia);
};

export const defineRoutes: { [key: string]: any }[] = [
	{
		path: '/dashboard',
		name: 'dashboard',
		redirect: '/dashboard/analysis',
		component: `#`,
		meta: {},
		children: [
			{
				path: 'analysis',
				name: 'dashboard-analysis',
				component: `app/admin/views/items/FormItem`,
				meta: {},
			},
		],
	},
	{
		path: '/items',
		name: 'items',
		component: `#`,
		meta: {},
		children: [
			{
				path: 'items-1',
				name: 'items-1',
				component: `app/admin/views/items/FormItem`,
				meta: {},
			},
			{
				path: 'items-2',
				name: 'items-2',
				component: `app/admin/views/items/FormItem`,
				meta: {},
			},
			{
				path: 'items-3',
				name: 'items-3',
				component: `app/admin/views/items/FormItem`,
				meta: {},
			},
		],
	},
	{
		path: '/form-items',
		name: 'form-items',
		component: `app/admin/views/items/FormItem`,
		meta: {},
		children: [
			{
				path: 'form-items-1',
				name: 'form-items-1',
				component: `app/admin/views/items/FormItem`,
				meta: {},
			},
			{
				path: 'form-items-2',
				name: 'form-items-2',
				component: `app/admin/views/items/FormItem`,
				meta: {},
			},
			{
				path: 'form-items-3',
				name: 'form-items-3',
				component: `app/admin/views/items/FormItem`,
				meta: {},
			},
		],
	},
];