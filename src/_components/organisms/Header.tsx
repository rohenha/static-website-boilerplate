// Data
import website from '@data/website'
import navigation from '@data/navigation'

export default function Header({ page }) {
	return (
		<header class="w-full py-sm px-sm flex items-center justify-between gap-sm border-b-1 b-solid b-red-300 mb-sm">
			<a href="/" class="home-link">{website.siteName}</a>
			<nav class="flex align-center gap-sm" aria-label="Top level navigation menu">
				{navigation.menu.map(item => (
					<a href={item.url} class={item.url === page.url ? 'opacity-25' : ''}>
						{item.text}
					</a>
				))}
			</nav>
		</header>
	);
}
