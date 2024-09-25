import {createRouter, createWebHistory, type Router} from 'vue-router';

const BASE_URL: () => string = (() => {

	console.log(import.meta.env.BASE_URL);

	return import.meta.env.BASE_URL;
});

const router: Router = createRouter({
	history: createWebHistory(
		BASE_URL()
	),
	routes: [
		{
			path: '/',
			redirect: '/login',
		},
		{
			path: '/login',
			name: 'login',
			component: () => import(`@/app/admin/views/LoginView.vue`),
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: () => import(`@/views/404.vue`),
		},
	],
});

export default router;