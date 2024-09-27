import {defineStore} from "pinia";
import type {RouteRecordRaw} from "vue-router";
import {pinia} from "@/plugin/pinia";
import {baseRouter} from "@/app/admin/router";
import {cloneDeep} from "lodash";

const modules: Record<
	string,
	() => Promise<unknown>
> = import.meta.glob([
	`/src/views/**/*.{vue,tsx}`,
	`/src/app/admin/views/**/*.{vue,tsx}`,
]);

console.log(modules)

const LayoutView = () => import('@/app/admin/views/LayoutView.vue');

const generateRoutes = (routes: RouteRecordRaw[]): RouteRecordRaw [] => {

	const routers: RouteRecordRaw [] = cloneDeep(routes);

	let routerMap: RouteRecordRaw [] = [];

	const requiredKey: string [] = [
		'path',
		'name',
		'redirect',
		'meta',
	];

	routers.forEach((route: { [key: string]: any }): void => {
		const data: { [key: string]: any } = Object.entries<[string, any] []>(route).reduce<{
			[key: string]: any
		}>(
			(obj: { [key: string]: any }, [key, value]: [string, [string, any] []]) => {
				if (requiredKey.includes(key) && !!value) obj [key] = value;
				return obj;
			}, {} as { [key: string]: any }
		);

		const component: undefined | string = route.component as unknown as undefined | string;

		if (!!component) {
			const comModule =
				modules [`/src/app/admin/views/${component}.vue`] ||
				modules [`/src/app/admin/views/${component}.tsx`] ||
				modules [`/src/views/${component}.vue`] ||
				modules [`/src/views/${component}.tsx`];

			if (!comModule && !component.includes('#')) {
				console.error(
					`未找到${route.component}.vue文件或${route.component}.tsx文件，请创建`
				);
			}

			data.component =
				component === '#' ? LayoutView : component === '##' ? {
					name: 'ParentLayout'
				} : comModule;
		}

		if (!!route.children) {
			data.children = generateRoutes(route.children);
		}

		routerMap.push(data as RouteRecordRaw);
	});

	return routerMap;
};


interface stateInterface {
	routers: RouteRecordRaw [];
	addRouters: RouteRecordRaw [];
	isAddRouters: boolean;
}

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
			return new Promise<void>((resolve): void => {
				const routers: RouteRecordRaw [] = generateRoutes(routes);
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
				component: `items/FormItem`,
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
				component: `items/FormItem`,
				meta: {},
			},
			{
				path: 'items-2',
				name: 'items-2',
				component: `items/FormItem`,
				meta: {},
			},
			{
				path: 'items-3',
				name: 'items-3',
				component: `items/FormItem`,
				meta: {},
			},
		],
	},
	{
		path: '/form-items',
		name: 'form-items',
		component: `items/FormItem`,
		meta: {},
		children: [
			{
				path: 'form-items-1',
				name: 'form-items-1',
				component: `items/FormItem`,
				meta: {},
			},
			{
				path: 'form-items-2',
				name: 'form-items-2',
				component: `items/FormItem`,
				meta: {},
			},
			{
				path: 'form-items-3',
				name: 'form-items-3',
				component: `items/FormItem`,
				meta: {},
			},
		],
	},
];