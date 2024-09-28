// noinspection JSUnusedGlobalSymbols

import {cloneDeep} from "lodash";
import type {Router, RouteRecordRaw} from "vue-router";

export type ReturnTypeRouter<T> = () => Promise<T | (ReturnTypeRouter<T>)>;

const modules: Record<string, ReturnTypeRouter<unknown>> =
	import.meta.glob(`/src/**/*.{vue,tsx}`);

const viewModules = (): { [key: string]: Function } => {
	const getModule = (component: string): ReturnTypeRouter<unknown> => {

		const comModule: ReturnTypeRouter<unknown> =
			modules [`/src/${component}.vue`] ||
			modules [`/src/${component}.tsx`];

		if (!comModule && !component.includes('#')) {
			console.error(`未找到/src/${component}.vue文件或/src/${component}.tsx文件，请创建`);
		}

		return comModule;
	};

	const generateRoutes = (
		routes: RouteRecordRaw [],
		layoutView: ReturnTypeRouter<any>,
	): RouteRecordRaw[] => {
		const routers: RouteRecordRaw [] = cloneDeep(routes);

		let routerMap: RouteRecordRaw [] = [];

		const requiredKey: string [] = [
			'path',
			'name',
			'redirect',
			'meta',
		];

		for (const route of routers) {
			const data: {
				[key: string]: any
			} = Object.entries(route).reduce<{
				[key: string]: any
			}>(
				(
					obj: { [key: string]: any }, [key, value]: [string, [string, any] []]) => {
					if (requiredKey.includes(key) && !!value) obj [key] = value;
					return obj;
				}, {} as { [key: string]: any }
			);

			const component: undefined | string = route.component as unknown as undefined | string;

			if (!!component) {
				const comModule: ReturnTypeRouter<any> = getModule(component);

				data.component =
					component === '#'
						? layoutView
						: component === '##' ? {
							name: 'ParentLayout'
						} : comModule;
			}

			if (!!route.children) {
				data.children = generateRoutes(route.children, layoutView);
			}

			routerMap.push(data as RouteRecordRaw);
		}

		return routerMap;
	}


	return {
		getModule,
		generateRoutes,
	};
};

const routerModules = () => {
	const getRouterPath = (app: string): string => {
		return `/src/app/${app}/router/index.ts`;
	};

	const hasRouterModule = (app: string): boolean => {
		return modules.hasOwnProperty(
			getRouterPath(app)
		);
	};

	const getRouterModule = async (app: string): Promise<Router> => {
		if (!hasRouterModule(app)) {
			throw new Error(`Router not found for path: ${getRouterPath(app)}`);
		}

		const routerModule: {
			default: Router
		} = await modules [getRouterPath(app)]() as {
			default: Router
		};

		return routerModule.default;
	};

	return {
		getRouterModule,
	};
};

export {
	viewModules,
	routerModules,
};