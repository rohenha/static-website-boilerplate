export default function Pagination({ pagination, className }) {
	if (pagination.pages.length <= 1) {
		return null
	}

	return (
		<nav aria-label="Pagination" class={className}>
			<ul class="flex items-center gap-sm">
				{pagination.href.previous ? (
					<li class="">
						<a href={pagination.href.previous} aria-label="Page précédente">&laquo; Précédent</a>
					</li>
				) : (
					<li class="opacity-25">
						<span>&laquo; Précédent</span>
					</li>
				)}

				{Array.from({ length: pagination.pages.length }).map((_, pageNumber) => {
					const pageHref = pagination.hrefs[pageNumber]
					return (
						<li class={`pagination-page${pagination.pageNumber === pageNumber ? ' active' : ''}`}>
							{pagination.pageNumber === pageNumber ? (
								<span aria-current="page" class="opacity-25">{pageNumber + 1}</span>
							) : (
								<a href={pageHref}>{pageNumber + 1}</a>
							)}
						</li>
					)
				})}

				{pagination.href.next ? (
					<li class="">
						<a href={pagination.href.next} aria-label="Page suivante">Suivant &raquo;</a>
					</li>
				) : (
					<li class="opacity-25">
						<span>Suivant &raquo;</span>
					</li>
				)}
			</ul>
		</nav>
	)
}

// {% if pagination.pages.length > 1 %}
// 		<nav aria-label="Pagination" class="">
// 			<ul class="flex items-center gap-sm">
// 				{% if pagination.href.previous %}
// 					<li class="pagination-previous">
// 						<a href="{{ pagination.href.previous }}" aria-label="Page précédente">&laquo; Précédent</a>
// 					</li>
// 				{% else %}
// 					<li class="pagination-previous disabled">
// 						<span>&laquo; Précédent</span>
// 					</li>
// 				{% endif %}

// 				{% for pageNumber in range(0, pagination.pages.length) %}
// 					{% set pageHref = pagination.hrefs[pageNumber] %}
// 					<li class="pagination-page{% if pagination.pageNumber == pageNumber %} active{% endif %}">
// 						{% if pagination.pageNumber == pageNumber %}
// 							<span aria-current="page">{{ pageNumber + 1 }}</span>
// 						{% else %}
// 							<a href="{{ pageHref }}">{{ pageNumber + 1 }}</a>
// 						{% endif %}
// 					</li>
// 				{% endfor %}

// 				{% if pagination.href.next %}
// 					<li class="pagination-next">
// 						<a href="{{ pagination.href.next }}" aria-label="Page suivante">Suivant &raquo;</a>
// 					</li>
// 				{% else %}
// 					<li class="pagination-next disabled">
// 						<span>Suivant &raquo;</span>
// 					</li>
// 				{% endif %}
// 			</ul>
// 		</nav>
// 	{% endif %}
