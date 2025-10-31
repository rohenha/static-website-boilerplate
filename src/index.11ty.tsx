import Button from "@components/atoms/Button"
import Svg from "@components/atoms/Svg"

export default function Home() {
  return (<main id="main" class="w-full px-sm py-[600px]">
		<h1 class="text-xl mb-xsm">Hello, Eleventy with React!</h1>
		<Svg icon="facebook" />
		<Button>Click Me</Button>
	</main>)
}

export const data = {
	layout: 'base',
  seoTitle: 'Home Page',
	metas: `
		<meta name="keywords" content="Eleventy, React, Static Site Generator">
		<meta name="author" content="Your Name">
	`
}
