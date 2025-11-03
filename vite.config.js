/* ──────────────────────────────────────────────────────────
►►► Vite Config
────────────────────────────────────────────────────────── */
import { defineConfig } from "vite"
import path from "path"

// Plugins
import vitePluginEleventy from "@rohenha/vite-plugin-eleventy"
import criticalCssPlugin from "@rohenha/vite-plugin-critical-css"
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import sassGlobImports from 'vite-plugin-sass-glob-import'
import brotli from 'rollup-plugin-brotli'
import tsconfigPaths from 'vite-tsconfig-paths'
// Config
import { config as projectConfig } from './config.js'


export default ({ mode }) => {
	const isProd = mode === 'production'

	return defineConfig({
		publicDir: 'public',
		plugins: [
			tsconfigPaths(),
			tailwindcss({
				content: [
					'./src/**/*.{tsx,ts,jsx,js,md}',
					'./.eleventy/**/*.html'
				],
			}),
			sassGlobImports(),
			brotli(),
			visualizer({
				gzipSize: true,
				brotliSize: true,
				open: false,
				template: 'treemap',
			}),
			criticalCssPlugin({
				viewportWidth: 1440,
				viewportHeight: 930,
				outputDir: projectConfig.buildDir,
				timeout: 30000
			}),
			vitePluginEleventy({
				outputDir: projectConfig.buildDir,
				eleventyDir: projectConfig.eleventyDir,
				srcDir: projectConfig.srcDir,
				assetsDir: projectConfig.assetsDir,
			}),
		],
		resolve: {
			alias: {
				'@scripts': path.resolve(process.cwd(), 'assets/scripts'),
				'@styles': path.resolve(process.cwd(), 'assets/styles'),
				'@types': path.resolve(process.cwd(), 'src/types'),
				'@components': path.resolve(process.cwd(), 'src/_components'),
				'@layouts': path.resolve(process.cwd(), 'src/_layouts'),
				'@data': path.resolve(process.cwd(), 'src/_data'),
			},
		},
		server: {
			watch: {
				// Force Vite à surveiller les fichiers sources pour Tailwind
				ignored: ['!**/src/**'],
			}
		},
		build: {
			outDir: projectConfig.buildDir,
      sourcemap: isProd ? false : 'inline',
      minify: isProd ? 'esbuild' : false,
			rollupOptions: {
			}
		},
	})
}
