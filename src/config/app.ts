import type {ReturnTypeRouter} from "@/config/types";

interface AppConfigInterface {
	defaultApp: string,
	app: {
		[key: string]: {
			base: string,
			layout?: ReturnTypeRouter<any>,
			pathMatch: {
				path: string,
				name: string,
				redirect: string,
			},
		},
	},
	pages: { [key: string | number]: any },
}

const appConfig: AppConfigInterface = {
	defaultApp: 'index',
	app: {
		admin: {
			base: '/admin',
			layout: () => import(`@/app/admin/views/LayoutView.vue`),
			pathMatch: {
				path: '/:pathMatch(.*)*',
				name: 'NotFound',
				redirect: '/404',
			},
		},
	},
	pages: {
		404: '@/views/404.vue',
	},
};

export default appConfig;