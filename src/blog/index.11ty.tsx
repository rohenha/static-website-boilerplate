import Pagination from '@components/organisms/Pagination'

export default function BlogIndex({ pagination }: { pagination: Eleventy.PaginationData<{ article: BlogPost }> }) {
	return (<main id="main" class="w-full px-sm">
		<h1 class="text-xl mb-xsm">Feed</h1>
		<ul class="">
		{pagination.items.map(item => (
			<li key={item.id}><a href={item.url}>{item.data.article.title}</a></li>
		))}
		</ul>
		<Pagination pagination={pagination} className="mt-xsm" />
	</main>)
}

export const data = {
	layout: 'base',
	pagination: {
		data: 'collections.blogItems',
		size: 2,
		generatePageOnEmptyData: true
	},
	permalink: (data) => {
		return `blog/${data.pagination.pageNumber > 0 ? `${data.pagination.pageNumber + 1}/` : ''}`
	},
	seoTitle: 'Blog'
}
