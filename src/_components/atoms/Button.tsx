import React from "react"

export default function Button({ children }: { children: React.ReactNode }) {
	return <button class="px-tiny py-[3px] text-sm bg-black text-white rounded-sm cursor-pointer hover:bg-black/80">{children}</button>
}
