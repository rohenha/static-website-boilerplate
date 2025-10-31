// Data
import website from "@data/website"
import navigation from '@data/navigation'

export default function Footer({ eleventy, page }) {
	return (
		<footer class="container o-footer py-sm px-sm flex items-center justify-between gap-sm border-t-1 b-solid b-red-300 mx-auto mt-sm">
			<nav>
				<ul class="flex align-center gap-sm">
					{navigation.footer.map(item => (
						<li>
							<a href={item.url} class={item.url === page.url ? 'opacity-25' : ''}>
								{item.text}
							</a>
						</li>
					))}
				</ul>
			</nav>
			<p>
				<span>© 2025 {website.siteName} - </span>
				<span><em>Built with <a href="https://www.11ty.dev/">{ eleventy.generator}</a></em></span>
			</p>
		</footer>
	);
}




{/* <footer class="o-footer py-md px-sm flex items-center justify-between gap-sm w-full">

	{{ svg.component({ icon: 'facebook' }) }}
	<nav>
		<ul class="flex align-center gap-sm">
				{% for item in navigation.footer %}
					<li><a href="{{ item.url }}"{% if item.url == page.url %} aria-current="page"{% endif %}{{ item.attributes|safe }}>{{ item.text }}</a></li>
				{% endfor %}
		</ul>
	</nav>

	<p><em>Built with <a href="https://www.11ty.dev/">{{ eleventy.generator }}</a></em></p>
</footer> */}
