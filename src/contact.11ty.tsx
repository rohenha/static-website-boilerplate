import Button from "@components/atoms/Button"

export default function Contact() {
  return (<main id="main" class="w-full px-sm">
		<h1 class="text-xl mb-xsm">Contact Page</h1>
		<Button>Learn More</Button>
	</main>)
}

export const data = {
	layout: 'base',
  seoTitle: 'Contact Page'
}
