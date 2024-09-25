import {createRouter, createWebHistory} from 'vue-router';

console.log(__ROUTER_MODE__);

// const match = /(?:http|https):\/{2}([A-Za-z0-9.]*?):?[0-9]+/gm;

const match: RegExp = /(^[A-Za-z0-9]*)/gm;

import.meta.env.BASE_URL = '/admin';

console.log(window.location, import.meta.env);

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'index',
			component: () => import('@/views/IndexView.vue'),
		},
	],
});

export default router;