import {createRouter, createWebHistory} from 'vue-router';

const mode: string = import.meta.env.MODE || 'development';

const match: RegExp = /.*:\/{2}([^.:]*).*?\/([^\/]*)\/?/gm;

const matchReg: RegExpExecArray | null = new RegExp(match).exec(window.location.href);

console.log(matchReg);

//	development
if ('development' === mode) {

}

import.meta.env.BASE_URL = '/admin';

console.log(window.location, import.meta.env);

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/a',
			name: 'index',
			component: () => import('@/views/IndexView.vue'),
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: () => import(`@/views/404.vue`),
		},
	],
});

export default router;