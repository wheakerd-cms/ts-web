import {fileURLToPath, URL} from 'node:url';

import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import * as path from "node:path";

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
			vue(),
			VueJsx(),
			vueDevTools(),
		],
		build: {
			target: 'esnext',
			outDir: 'dist',	// 输出目录
			cssCodeSplit: true,
			sourcemap: true,
			// terserOptions: {
			// 	compress: {
			// 		drop_console: true,	// 删除 console.log
			// 		dead_code: true,	// 删除死代码
			// 	},
			// 	// 混淆变量名
			// 	mangle: true,
			// 	output: {
			// 		// 删除注释
			// 		comments: false,
			// 	},
			// },
			rollupOptions: {
				input: path.resolve(__dirname, 'index.html'),
				output: {
					// 设置文件名格式
					assetFileNames: 'assets/[ext]/[name].[hash][extname]',
					entryFileNames: 'vendor/[name].[hash].js',
					chunkFileNames: 'chunks/[name].[hash].js',
					//	切片逻辑
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