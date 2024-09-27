import type {Router} from "vue-router";

type returnTypeRouter<T> = () => Promise<T | (returnTypeRouter<T>)>;

const routerModule = () => {
	const routerModules: Record<string, returnTypeRouter<unknown>> =
		import.meta.glob(`/src/app/**/router/*.ts`);

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
			default: Router
		} = await routerModules[getRouterPath(app)]() as {
			default: Router
		};

		return routerModule.default;
	};

	return {
		hasRouterModule,
		getRouterModule,
	};
};

export {
	routerModule,
};