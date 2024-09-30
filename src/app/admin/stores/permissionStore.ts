
export const defineRoutes: { [key: string]: any }[] = [
	{
		path: '/dashboard',
		name: 'dashboard',
		redirect: '/dashboard/analysis',
		component: `#`,
		meta: {},
		children: [
			{
				path: 'analysis',
				name: 'dashboard-analysis',
				component: `app/admin/views/items/FormItem`,
				meta: {},
			},
		],
	},
	{
		path: '/items',
		name: 'items',
		component: `#`,
		meta: {},
		children: [
			{
				path: 'items-1',
				name: 'items-1',
				component: `app/admin/views/items/FormItem`,
				meta: {},
			},
			{
				path: 'items-2',
				name: 'items-2',
				component: `app/admin/views/items/FormItem`,
				meta: {},
			},
			{
				path: 'items-3',
				name: 'items-3',
				component: `app/admin/views/items/FormItem`,
				meta: {},
			},
		],
	},
	{
		path: '/form-items',
		name: 'form-items',
		component: `app/admin/views/items/FormItem`,
		meta: {},
		children: [
			{
				path: 'form-items-1',
				name: 'form-items-1',
				component: `app/admin/views/items/FormItem`,
				meta: {},
			},
			{
				path: 'form-items-2',
				name: 'form-items-2',
				component: `app/admin/views/items/FormItem`,
				meta: {},
			},
			{
				path: 'form-items-3',
				name: 'form-items-3',
				component: `app/admin/views/items/FormItem`,
				meta: {},
			},
		],
	},
];