import fs from 'fs'
import path from 'path'
/**
 * Debouncing enforces that a function not be called again until a certain amount of time has passed without it being called.
 * As in "execute this function only if 100 milliseconds have passed without it being called."
 *
 * @method debounce
 * @access public
 * @param {function} callback
 * @param {integer} delay
 * @returns {function}
 * @example
 * import { debounce } from "path/to/utils.js"
 *
 * document.body.addEventListener('scroll', debounce(
 *    () => {
 *      // Your code here
 *      // Executed 50ms after the user stops to scroll
 *    }, 50
 * ))
 */
export const debounce = (callback: (...args: any[]) => void, delay: number) => {
  let timer: NodeJS.Timeout | undefined
  return (...args: any[]) => {
    // eslint-disable-next-line no-undef
    const context = this
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback.apply(context, args)
    }, delay)
  }
}

/**
 * @description Recursively copy a directory from source to destination
 * @param {string} src - Source directory path
 * @param {string} dest - Destination directory path
 * @return {void}
 */
export const copyDirectory = (src: string, dest: string) => {
	if (!fs.existsSync(dest)) {
		fs.mkdirSync(dest, { recursive: true })
	}

	const items = fs.readdirSync(src)

	items.forEach(item => {
		const srcPath = path.join(src, item)
		const destPath = path.join(dest, item)

		if (fs.statSync(srcPath).isDirectory()) {
			copyDirectory(srcPath, destPath)
		} else {
			fs.copyFileSync(srcPath, destPath)
		}
	})
}
