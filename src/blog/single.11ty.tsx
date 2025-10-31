export default function Article({ article }: { article: BlogPost }) {
	return (<main id="main" class="w-full px-sm">
		<h1 class="text-xl mb-xsm">{article.title}</h1>
		<p class="text-base">{article.content}</p>
	</main>)
}

export const data = {
	layout: 'base',
	tags: 'blogItems',
	pagination: {
		data: "blog",
		size: 1,
		alias: 'article',
		addAllPagesToCollections: true
	},
	permalink: (data) => `blog/${data.article.slug}/`,
	seoTitle: (data) => data.article.title
}
