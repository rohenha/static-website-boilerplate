import Button from "@components/atoms/Button"

export default function About() {
  return (<main id="main" class="w-full px-sm">
		<h1 class="text-xl mb-xsm">About Page</h1>
		<p class="text-base">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate laborum quia atque. Nulla similique deserunt eos ea fugit excepturi sint sed natus nemo exercitationem eaque, aliquam tempore praesentium maiores labore.</p>
	</main>)
}

export const data = {
	layout: 'base',
  seoTitle: 'About Page'
}
