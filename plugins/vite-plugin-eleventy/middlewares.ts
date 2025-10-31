import { existsSync } from 'fs'
import path from 'path'

/**
 * @description Middleware to serve Eleventy generated HTML files during development
 * @param eleventyDir The directory where Eleventy outputs HTML files
 * @param req The HTTP request object
 * @param res The HTTP response object
 * @param next The next middleware function
 * @return void
 */
export const middlewareRoutes = (eleventyDir: string, req: any, res: any, next: any) => {
	let filePath = ''
	if (req.url) {
		// Check if the URL ends with '/' or '.html' to serve index.html or the HTML file
		if (req.url.endsWith('/') || req.url.endsWith('.html')) {
			let filePath = req.url === '/' ? '/index.html' : req.url
			if (req.url.endsWith('/') && !req.url.endsWith('index.html')) {
				filePath = req.url + 'index.html'
			}

			const fullPath = path.join(process.cwd(), eleventyDir, filePath)

			if (existsSync(fullPath)) {
				// Laisser Vite servir le fichier depuis _dist
				req.url = `/${eleventyDir}${filePath}`
			}
		}

		// Check if the URL is a directory without trailing slash to serve index.html
		const urlSplitted = req.url.split('/')
		const lastSegment = urlSplitted[urlSplitted.length - 1]
		if (lastSegment && !lastSegment.includes('.')) {
			filePath = req.url + '/index.html'
			const fullPath = path.join(process.cwd(), eleventyDir, filePath)

			if (existsSync(fullPath)) {
				req.url = `/${eleventyDir}${filePath}`
			}
		}

	}
	next()
}
