import type {RouteRecordRaw} from "vue-router";

export const generateRoutes = (routes: RouteRecordRaw []) => {
	if (!Array.isArray(routes)) {
		console.error('Expected an array of routes, but got:', routes);
		return [];
	}

	const result: RouteRecordRaw [] = [];

	structuredClone(routes).forEach((route: RouteRecordRaw) => {

	});
};