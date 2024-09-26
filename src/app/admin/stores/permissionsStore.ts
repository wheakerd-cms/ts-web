import {defineStore} from "pinia";
import type {RouteRecordRaw} from "vue-router";
import router from "@/router";
import {pinia} from "@/plugin/pinia";
import LayoutView from "@/app/admin/views/LayoutView.vue";
import {baseRouter} from "@/app/admin/router";
import {cloneDeep} from "lodash";

const modules: Record<
	string,
	() => Promise<unknown>
> = import.meta.glob(`/src/app/admin/views/**/*.{vue,tsx}`);

// import type {defineComponent} from "vue";

interface routerMetaInterface {
	title: string;
	icon?: string;
	permissions: string[];
}

// type Component<T = any> =
// 	| ReturnType<typeof defineComponent>
// 	| (() => Promise<typeof import('*.vue')>)
// 	| (() => Promise<T>);

interface stateInterface {
	routers: RouteRecordRaw [],
	addRouters: RouteRecordRaw [],
}

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

		// const data: { [key: string]: any } = Object.keys(route).filter(
		// 	(key: string) => filterKey.includes(key)
		// );

		const data: { [key: string]: any } = Object.entries<[string, any] []>(route).reduce<{
			[key: string]: any
		}>(
			(obj: { [key: string]: any }, [key, value]: [string, [string, any] []]) => {
				if (requiredKey.includes(key)) obj [key] = value;
				return obj;
			}, {} as { [key: string]: any }
		);

		const component: undefined | string = route.component as unknown as undefined | string;

		if (!!component) {
			const comModule =
				modules [`/src/app/admin/views/${component}.vue`] ||
				modules [`/src/app/admin/views/${component}.tsx`];

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

export const usePermissionsStore = defineStore('permissions', {
	state: (): stateInterface => ({
		routers: [] as RouteRecordRaw [],
		addRouters: [] as RouteRecordRaw [],
	}),
	getters: {
		getRouters(state) {

			console.log(state.routers)

			return state.routers;
		},
	},
	actions: {
		initRoutes(routes: RouteRecordRaw []): Promise<unknown> {
			return new Promise<void>((resolve): void => {
				let routerMapping: RouteRecordRaw [] = generateRoutes(routes);

				this.routers = cloneDeep(baseRouter).concat(routerMapping) as RouteRecordRaw [];

				console.log(this.routers);

				resolve();
			});
		},
		setAddRouters(routes: RouteRecordRaw []) {
			this.routers = routes;

			this.routers.forEach((route: RouteRecordRaw) => {
				// router.addRoute(route);
			});

			console.log(router.getRoutes())
		},
	},
	persist: true,
});

export const usePermissionsStoreWithout = () => {
	return usePermissionsStore(pinia);
};

export const defineRoutes: { [key: string]: any }[] = [
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