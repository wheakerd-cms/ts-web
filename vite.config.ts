import {fileURLToPath, URL} from 'node:url';

import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://cn.vitejs.dev/config/
export default defineConfig(({mode}: { mode: string }) => {

	const ENV: Record<string, string> = loadEnv(mode, process.cwd());

	return {
		server: {
			host: '0.0.0.0',
			port:
				5173,
		},
		define: {
			__ROUTER_MODE__: ENV.ViTE_ROUTER_MODE === void 0 ? "'router'" : JSON.stringify(ENV.ViTE_ROUTER_MODE),
		},
		plugins: [
			vue(),
			vueDevTools(),
		],
		resolve:
			{
				alias: {
					'@': fileURLToPath(
						new URL('./src', import.meta.url)
					),
				},
			},
	};
});