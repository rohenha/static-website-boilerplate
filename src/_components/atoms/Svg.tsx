export default function Svg({ icon, className }: { icon: string, className?: string }) {
	return (<svg aria-hidden="true" focusable="false" class={`w-4 h-4 inline-block ${className ?? ''}`}>
		<use href={`/assets/images/sprite.svg#icon-${icon}`} />
	</svg>)
}
