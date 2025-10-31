// Dependencies
import fs from 'fs'
import path from 'path'
// Local imports
import { middlewareRoutes } from './middlewares'
import { runEleventyServer, runEleventyBuild, startWatcher, configureHtmlInputs } from './commands'
import { copyDirectory } from './utils'

// Types
import { type FSWatcher } from 'chokidar'
import { type ChildProcess } from 'child_process'
import type { ViteDevServer, Plugin } from 'vite'
import type { VitePluginEleventyOptions } from './types/vite-plugin-eleventy'

/**
 * @description Vite plugin to integrate Eleventy static site generator
 * @param {VitePluginEleventyOptions} options - Plugin configuration options
 * @returns {Plugin} - Vite plugin instance
 */
export default function vitePluginEleventy({
	isProd = false,
	outputDir = '_site',
	eleventyDir = '_dist',
	srcDir = 'src',
	assetsDir = 'assets',
	eleventyArgs = []
}: VitePluginEleventyOptions): Plugin {

	let eleventyProcess: ChildProcess | null = null
	let htmlWatcher: FSWatcher| null = null

	return {
		name: 'vite-plugin-eleventy',
		// S'assurer que ce plugin s'exécute en dernier
		enforce: 'post',
		/**
		 * @description Run Eleventy build before Vite build in production and set HTML inputs
		 */
		async config(config, {command}) {
			if (command === 'build') {
				try {
					fs.rmSync(eleventyDir, { recursive: true, force: true })
					await runEleventyBuild(eleventyArgs)
					configureHtmlInputs({ config, eleventyDir: eleventyDir, assetsDir })
				} catch (error) {
					console.error('❗️ Eleventy build failed:', error)
					throw error
				}
			}
		},

		/**
		 * @description Start Eleventy server and setup middleware for development
		 */
		configureServer(server: ViteDevServer) {
			setTimeout(async () => {
				if (!eleventyProcess) {
					eleventyProcess = await runEleventyServer({
						eleventyArgs: eleventyArgs
					})
				}
			}, 100)

			server.middlewares.use(middlewareRoutes.bind(null, eleventyDir))
			server.watcher.unwatch(`./${srcDir}/**/*`)
			server.watcher.unwatch(`./${eleventyDir}/**/*.html`)

			htmlWatcher = startWatcher({
				watchDir: `./${eleventyDir}/**/*.html`,
				server
			})
		},

		/**
		 * @description Cleanup and copy final build from eleventyDir to outputDir
		 */
		async closeBundle() {
			if (isProd && fs.existsSync(eleventyDir)) {
				const tmpOutputPath = path.resolve(`${eleventyDir}/${outputDir}`)
				const finalOutputPath = path.resolve(outputDir)

				console.log('📦 Copying final build from temporary folder...')
				if (fs.existsSync(tmpOutputPath)) {
					// Supprimer le dossier de destination s'il existe
					if (fs.existsSync(finalOutputPath)) {
						fs.rmSync(finalOutputPath, { recursive: true, force: true })
					}

					// Copier les fichiers du dossier temporaire
					copyDirectory(tmpOutputPath, finalOutputPath)
					console.log(`✅ Build copied on final destination`)
				}

				// Nettoyer le dossier temporaire
				fs.rmSync(eleventyDir, { recursive: true, force: true })
				console.log('🧹 Tmp folder removed')
			}
		},

		/**
		 * @description Cleanup Eleventy process on build end
		 */
		async buildEnd() {
			if (eleventyProcess) {
				eleventyProcess.kill()
				eleventyProcess = null
			}

			if (htmlWatcher) {
				htmlWatcher.close()
				htmlWatcher = null
			}
		},




	}
}
