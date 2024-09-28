import {fileURLToPath, URL} from 'node:url';

import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import * as path from "node:path";

// EN: https://vitejs.dev/config/
// CN: https://cn.vitejs.dev/config/
export default defineConfig(({mode}: { mode: string }) => {
	const ENV: Record<string, string> = loadEnv(mode, process.cwd());
	return {
		server: {
			host: '0.0.0.0',
			port:
				5173,
		},
		define: {
			__ROUTER_MODE__: ENV.ViTE_ROUTER_MODE === void 0 ? "'host'" : JSON.stringify(ENV.ViTE_ROUTER_MODE),
		},
		plugins: [
			vue(),
			VueJsx(),
			vueDevTools(),
		],
		build: {
			target: 'esnext',
			rollupOptions: {
				input: {
					main: path.resolve(__dirname, 'src/main.ts'),
					styles: path.resolve(__dirname, 'src/assets/main.scss'),
				},
			},
			output: 'dist',
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.scss', '.css'],
			alias: {
				'@': fileURLToPath(
					new URL('./src', import.meta.url)
				),
			},
		},
	};
});