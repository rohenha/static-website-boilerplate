import { Plugin, loadEnv, HtmlTagDescriptor } from 'vite'
import puppeteer, { type Browser } from 'puppeteer'

import { generateHtmlToCriticalCss, getCriticalHTML, extractCriticalCss } from './commands'

/**
 * @description Vite plugin to generate and inline critical CSS using Puppeteer
 * @param {object} options - Plugin configuration options
 * @param {number} [options.viewportWidth=1200] - Width of the viewport for Puppeteer
 * @param {number} [options.viewportHeight=800] - Height of the viewport for Puppeteer
 * @param {string} [options.outputDir='_site'] - Output directory where the CSS files are located
 * @param {number} [options.timeout=30000] - Timeout for Puppeteer operations in milliseconds
 * @returns {Plugin} - Vite plugin instance
 */
export default function CriticalCssPlugin({
	viewportWidth = 1200,
	viewportHeight = 800,
	outputDir = '_site',
	timeout = 30000
}: {
	viewportWidth?: number;
	viewportHeight?: number;
	outputDir?: string;
	timeout?: number;
}): Plugin {

	let browser: Browser | null = null
	// let page: Page | null = null
	return {
		name: 'critical-css',
		enforce: 'post',
		async config(config, { command }) {
			if (command === 'build') {
				const env = loadEnv('production', process.cwd(), '')
				browser = await puppeteer.launch({
					headless: true, // Mode headless standard
					args: [
						'--no-sandbox',
						'--disable-setuid-sandbox',
						'--disable-dev-shm-usage',
						'--disable-accelerated-2d-canvas',
						'--no-first-run',
						'--no-zygote',
						'--single-process', // Important pour macOS
						'--disable-gpu',
						'--disable-web-security',
						'--disable-features=VizDisplayCompositor'
					],
					executablePath: env.VITE_PUPPETEER_EXECUTABLE_PATH,
				})

			}
		},
		async transformIndexHtml(html: string, context: any) {
			if (!browser) {
				return html
			}
			const tags: HtmlTagDescriptor[] = []
			try {
				const page = await browser.newPage()
				await page.setViewport({
					width: viewportWidth,
					height: viewportHeight
				})

				// Inject CSS inline in HTML
				const {html: htmlWithInlineCSS, cssIds} = await generateHtmlToCriticalCss(html, outputDir)


				// Load the HTML content in Puppeteer
				await page.setContent(htmlWithInlineCSS, {
					waitUntil: 'networkidle0',
					timeout: timeout
				})


				const criticalHTML = await getCriticalHTML(page)
				const criticalCss = await extractCriticalCss(criticalHTML, cssIds)

				// Find the position of the first stylesheet link
				const stylesheetLinkRegex = /<link[^>]*rel=["']stylesheet["'][^>]*>/
				const match = html.match(stylesheetLinkRegex)

				if (match && match.index !== undefined) {
					// Inject critical CSS just before the first stylesheet link
					const beforeLink = html.substring(0, match.index)
					const afterLink = html.substring(match.index)
					html = beforeLink + `<style>${criticalCss}</style>` + afterLink
				} else {
					// Fallback: add to head if no stylesheet links found
					tags.push({
						tag: 'style',
						children: criticalCss,
						injectTo: 'head-prepend',
					})
				}

				console.log('✅ Critical CSS generated for:', context.filename)

				return {
					html,
					tags
				}

			} catch (error) {
				console.warn('⚠️ Erreur Puppeteer:', error)
				return html // Fallback to original HTML on error
			}
		},
		async closeBundle() {
			if (!browser) return
			await browser.close()
		}
	}
}
