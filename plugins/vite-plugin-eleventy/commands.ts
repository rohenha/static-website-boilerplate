// Dependencies
import { ChildProcess, spawn } from 'child_process'
import { watch } from 'chokidar'
import { glob } from 'glob'
import path from 'path'
import fs from 'fs'

// Local imports
import { debounce, copyDirectory } from './utils'

// Types
import type { runEleventyServerOptions, watcherOptions, configureHtmlInputsOptions } from './types/vite-plugin-eleventy'

/**
 * @description Render log data with a specific prefix
 * @param {Buffer} data - The log data
 * @param {string} prefix - The prefix to add before the log
 * @return {void}
 */
const renderLog = (data: Buffer, prefix: string) => {
	const content = data.toString().trim()
	if(content.length > 0) {
		console.log(`${prefix}${content}`)
	}
}

/**
 * @description Start Eleventy in watch mode as a child process
 * @param {runEleventyServerOptions} options - Options for running Eleventy
 * @returns {Promise<ChildProcess>} - The spawned Eleventy child process
 */
export const runEleventyServer = async ({ eleventyArgs = [] }: runEleventyServerOptions): Promise<ChildProcess> => {
	console.log(`🔄 Starting Eleventy server ...`)

	const child = spawn('npx', ['eleventy', '--watch', '--quiet', ...eleventyArgs], {
		stdio: ['pipe', 'pipe', 'pipe'],
		shell: true
	})

	child.stdout.on('data', (data) => renderLog(data, '🔎'))
	child.stderr.on('data', (data) => renderLog(data, '❗️'))

	child.on('close', () => {
		console.log(`🏁 Stopping Eleventy server ...`)
	})

	child.on('error', (error) => {
		new Error(`Eleventy build failed: ${error.message}`)
	})

	return child
}

/**
 * @description Run Eleventy build as a child process
 * @param {string[]} eleventyArgs - Additional arguments for Eleventy
 * @returns {Promise<void>}
 */
export const runEleventyBuild = async (eleventyArgs: string[] = []) => {
	return new Promise<void>((resolve, reject) => {
		console.log('🚀 Starting Eleventy build for production...')
		const child = spawn('npx', ['eleventy', ...eleventyArgs], {
			stdio: ['pipe', 'pipe', 'pipe'],
			shell: true
		})

		child.stdout.on('data', (data) => renderLog(data, '🔎'))
		child.stderr.on('data', (data) => renderLog(data, '❗️'))

		child.on('close', (code) => {
			if (code === 0) {
				console.log('✅ Eleventy build completed successfully.')
				resolve()
			} else {
				reject(new Error(`Eleventy build failed with code ${code}`))
			}
		})

		child.on('error', (error) => {
			reject(new Error(`Eleventy build failed: ${error.message}`))
		})
	})
}


/**
 * @description Start a file watcher on the Eleventy output directory to trigger Vite full reloads
 * @param {watcherOptions} options - Options for the watcher
 * @returns {FSWatcher} - The file watcher instance
 */
export const startWatcher = ({ watchDir = '_site/**/*.html', server }: watcherOptions) => {
	const watcher = watch(watchDir, {
			ignored: /node_modules/,
			persistent: true,
			ignoreInitial: true // ignore initials events
	})

	const debounceChange = debounce(() => {
		console.log('🔄 HTML files changed, triggering full reload...')
		server.ws.send({ type: 'full-reload' })
	}, 50)

	watcher.on('change', () => {
		debounceChange()
	})

	watcher.on('add', () => {
		debounceChange()
	})

	watcher.on('unlink', () => {
		debounceChange()
	})

	return watcher
}


/**
 * @description Configure Vite build inputs to include HTML files from Eleventy output
 * @param {configureHtmlInputsOptions} options - Options for configuring HTML inputs
 * @return {Promise<void>}
 */
export const configureHtmlInputs = async ({ config, eleventyDir, assetsDir }: configureHtmlInputsOptions) => {
	console.log('🛠️ Configuring HTML inputs for Vite build...')
	const htmlFiles = glob.sync(`${eleventyDir}/**/*.html`)
	if (htmlFiles.length > 0) {
		const inputs: Record<string, string> = {}

		// Copy all HTML files
		htmlFiles.forEach(async (file) => {
			const relativePath = path.relative(eleventyDir, file)
			const key = relativePath.replace(/\.html$/, '').replace(/[\/\\]/g, '-') || 'index'
			inputs[key] = path.resolve(file)
		})

		// Copy assets folder
		const assetsSourcePath = path.resolve(assetsDir)
		const assetsDestPath = path.join(eleventyDir, 'assets')

		if (fs.existsSync(assetsSourcePath)) {
			copyDirectory(assetsSourcePath, assetsDestPath)
		}

		// Copy public folder
		const publicSourcePath = path.resolve('public')
		const publicDestPath = path.join(eleventyDir, 'public')

		if (fs.existsSync(publicSourcePath)) {
			copyDirectory(publicSourcePath, publicDestPath)
		}

		// Configure vite to use the eleventyDir as root and set the inputs
		config.root = eleventyDir
		config.build = config.build || {}
		config.build.rollupOptions = config.build.rollupOptions || {}
		config.build.rollupOptions.input = inputs

		console.log('📄 Files added:', Object.keys(inputs).join(', '))
	}
}
