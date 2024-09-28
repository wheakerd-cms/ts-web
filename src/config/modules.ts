import {cloneDeep} from "lodash";
import type {Router, RouteRecordRaw} from "vue-router";
import type {ReturnTypeRouter} from "@/config/types";
import {useAppStore} from "@/stores/app";

const modules = () => {
	const routerModules: Record<string, ReturnTypeRouter<unknown>> =
		import.meta.glob(`/src/app/**/router/*.ts`);

	const viewModules: Record<string, ReturnTypeRouter<unknown>> =
		import.meta.glob([
			`/src/app/**/views/**/*.{vue,tsx}`,
			`/src/views/**/*.{vue,tsx}`,
		]);

	return {
		routerModules,
		viewModules,
	};
};

const viewModules = (): { [key: string]: Function } => {

	const layoutView: ReturnTypeRouter<any> = useAppStore().getLayoutView;

	const getModule = (component: string): ReturnTypeRouter<unknown> => {
		const viewModules: Record<string, ReturnTypeRouter<unknown>> = modules().viewModules;

		const comModule: ReturnTypeRouter<unknown> =
			viewModules [`/src/${component}.vue`] ||
			viewModules [`/src/${component}.tsx`];

		if (!comModule && !component.includes('#')) {
			console.error(
				`View model missing: /src/${component}.vue file or /src/${component}.tsx file not found, please create`
			);
		}

		return comModule;
	};

	const generateRoutes = (routes: RouteRecordRaw []): RouteRecordRaw[] => {
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
				data.children = generateRoutes(route.children);
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
	const {
		routerModules,
	} = modules();

	const getRouterPath = (app: string): string => {
		return `/src/app/${app}/router/index.ts`;
	};

	const hasRouterModule = (app: string): boolean => {
		return routerModules.hasOwnProperty(
			getRouterPath(app)
		);
	};

	const getRouterModule = async (app: string): Promise<Router> => {
		if (!hasRouterModule(app)) {
			throw new Error(`Router not found for path: ${getRouterPath(app)}`);
		}

		const routerModule: {
			default: Router;
		} = await routerModules [getRouterPath(app)]() as {
			default: Router;
		};

		return routerModule.default;
	};

	return {
		hasRouterModule,
		getRouterModule,
	};
};

export {
	viewModules,
	routerModules,
};