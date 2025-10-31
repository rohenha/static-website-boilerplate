
import { Plugin, HtmlTagDescriptor } from 'vite'

/**
 * @description Vite plugin to optimize HTML performance by deferring CSS and JS loading
 * @returns {Plugin} - Vite plugin instance
 */
export default function htmlPerfPlugin(): Plugin {
	return {
		name: 'html-perf',
		enforce: 'post',
		transformIndexHtml(html: string, context: any) {
			if (!context.bundle) return html

			const tags: HtmlTagDescriptor[] = []
			const bundle = context.bundle

			// 1. Threat only CSS files that are in the HTML
			const cssMatches = html.match(/<link[^>]*href="[^"]*\.css"[^>]*>/g) || []

			cssMatches.forEach(cssLink => {
				const hrefMatch = cssLink.match(/href="([^"]*)"/)
				if (hrefMatch) {
					const cssPath = hrefMatch[1]

					// Replace the original link with a deferred loading link
					html = html.replace(
						cssLink,
						`<link rel="stylesheet" href="${cssPath}" media="print" onload="this.media='all'; this.onload=null; this.isLoaded=true">`
					)

					// 2. Add noscript fallback
					tags.push({
						tag: 'noscript',
						children: [
							{
								tag: 'link',
								attrs: {
									rel: 'stylesheet',
									href: cssPath,
								},
							},
						],
						injectTo: 'body',
					})
				}
			})

			// 3. Treat only JS scripts that are in the HTML
			const scriptMatches = html.match(/<script[^>]*src="[^"]*\.js"[^>]*><\/script>/g) || []

			scriptMatches.forEach(scriptTag => {
				const srcMatch = scriptTag.match(/src="([^"]*)"/)
				const typeMatch = scriptTag.match(/type="([^"]*)"/)

				if (srcMatch) {
					const jsPath = srcMatch[1]
					const scriptType = typeMatch ? typeMatch[1] : 'module'

					// Remove the original script tag
					html = html.replace(scriptTag, '')

					// Add the script to the footer with defer
					tags.push({
						tag: 'script',
						attrs: {
							type: scriptType,
							src: jsPath,
							defer: true,
						},
						injectTo: 'body',
					})
				}
			})

			return {
				html,
				tags,
			}
		}
	}
}
