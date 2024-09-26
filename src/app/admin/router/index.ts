import {createRouter, createWebHistory, type Router, type RouteRecordRaw} from "vue-router";
import {usePermissionsStoreWithout} from "@/app/admin/stores/permissionsStore";

console.log(
	usePermissionsStoreWithout().getRouters,
)

export const baseRouter: { [key: string]: any } [] = [
	{
		path: '/',
		name: 'index',
		redirect: '/home',
	},
	{
		path: '/login',
		name: 'login',
		component: () => import(`@/app/admin/views/index/LoginView.vue`),
	},
	{
		path: '/home',
		name: 'home',
		component: () => import(`@/app/admin/views/LayoutView.vue`),
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: () => import(`@/views/404.vue`),
	},
];

// console.log(unref(baseRouter));

const router: Router = createRouter({
	history: createWebHistory(
		import.meta.env.BASE_URL
	),
	routes: [
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: () => import(`@/views/404.vue`),
		},
	],
});

baseRouter.forEach((route: { [key: string]: any }) => {
	router.addRoute(route as RouteRecordRaw);
});

console.log(
	router.getRoutes()
)

router.beforeEach(async (to, from, next) => {

	console.log(
		to,
		from,
		// next,
	);

	next();

});

export default router;