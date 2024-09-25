import {createRouter, createWebHistory, type Router, type RouteRecordNormalized} from 'vue-router';
import adminRouter from '@/app/admin/router';

const routerList: { [key: string]: Router } = {
	admin: adminRouter,
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
	const routes: RouteRecordNormalized [] = routerList [app].getRoutes();

	routes.forEach((route: RouteRecordNormalized): void => {
		router.addRoute(route);
	});
} else {
	router.addRoute({
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: () => import(`@/views/404.vue`),
	});
}

export default router;