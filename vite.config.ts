import {fileURLToPath, URL} from 'node:url';

import {defineConfig, loadEnv} from 'vite';
import Vue from '@vitejs/plugin-vue';
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import VueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import progress from "vite-plugin-progress";
import * as path from "node:path";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";

// EN: https://vitejs.dev/config/
// CN: https://cn.vitejs.dev/config/
export default defineConfig(({mode}) => {
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
			Vue({
				script: {
					// 开启defineModel
					defineModel: true
				},
			}),
			AutoImport({
				resolvers: [ElementPlusResolver()],
				imports: [
					'vue',
					'vue-router',
					'pinia', // 如果需要使用 Pinia
				],
			}),
			Components({
				resolvers: [
					ElementPlusResolver(),
				],
			}),
			VueJsx(),
			vueDevTools(),
			progress(),
		],
		css: {
			preprocessorOptions: {
				sass: {
					additionalData: `@import "~@/assets/main.scss";`,
					javascriptEnabled: true,
				},
			},
		},
		resolve: {
			extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss', '.css'],
			alias: {
				'@': fileURLToPath(
					new URL('./src', import.meta.url)
				),
			},
		},
		esbuild: {
			pure: [
				'console.log',
			],
			drop: [
				'debugger',
			],
		},
		build: {
			target: 'ES2023',
			outDir: 'dist',
			cssCodeSplit: true,
			sourcemap: true,
			rollupOptions: {
				input: path.resolve(__dirname, 'index.html'),
				output: {
					format: 'es',
					assetFileNames: 'assets/[ext]/[name].[hash][extname]',
					entryFileNames: 'vendor/[name].[hash].js',
					chunkFileNames: 'chunks/[name].[hash].js',
					manualChunks: {
						'vue-chunks': [
							'vue',
							'vue-router',
							'pinia',
						],
						'element-plus': [
							'element-plus',
						],
					},
				},
			},
		},
		optimizeDeps: {
			include: [
				'vue',
				'vue-router',
				'vue-types',
				'@vueuse/core',
				'axios',
			],
		},
	};
});