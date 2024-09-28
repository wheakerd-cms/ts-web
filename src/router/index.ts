import {createRouter, createWebHistory, type Router} from "vue-router";
import adminRouter from "@/app/admin/router";

const routerModules: { [key: string]: Router } = {
	admin: adminRouter,
};

const mode: string = import.meta.env.MODE || 'development';
const match: RegExp = /.*:\/{2}([^.:]*).*?\/([^\/]*)\/?/gm;

const matchReg: RegExpExecArray | null = new RegExp(match).exec(window.location.href);
const app: string | undefined = 'development' === mode ? matchReg?. [2] : matchReg ?. [1];

const defaultRoute: Router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: () => import(`@/views/404.vue`),
		}
	],
});

const router: Router = !!app && routerModules.hasOwnProperty(app) ? routerModules[app] : defaultRoute;

export default router;