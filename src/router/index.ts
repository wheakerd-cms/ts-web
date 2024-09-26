import {createRouter, createWebHistory, type Router} from "vue-router";
// import adminRouter from "@/app/admin/router";

// const routerList: { [key: string]: Router } = {
// 	admin: adminRouter,
// };

const routerList: { [key: string]: () => Promise<Router> } = {
	admin: async (): Promise<Router> => {
		const module = await import(`@/app/admin/router`);
		return module.default;
	},
};

const mode: string = import.meta.env.MODE || 'development';
const match: RegExp = /.*:\/{2}([^.:]*).*?\/([^\/]*)\/?/gm;

const matchReg: RegExpExecArray | null = new RegExp(match).exec(window.location.href);
const app: string | undefined = 'development' === mode ? matchReg?. [2] : matchReg ?. [1];

if (app) import.meta.env.BASE_URL = `/${app}`;

let router: Router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [],
});

if (app && Object.hasOwn(routerList, app)) {

	const getRouter = async (app: string) => {
		const router: Router = await routerList[app](); // 确保这是一个调用
		return router; // 如果需要返回 router
	};




	// const routes: RouteRecordNormalized [] = routerList [app].getRoutes();
	//
	// routes.forEach((route: RouteRecordNormalized): void => {
	// 	router.addRoute(route);
	// });
} else {
	router.addRoute({
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: () => import(`@/views/404.vue`),
	});
}

export default router;