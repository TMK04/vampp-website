<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";

	const obj_color_class = {
		primary:
			"from-primary/90 to-primary-light/90 hover:from-primary/80 hover:to-primary-light/80 text-white/95",
		secondary:
			"from-secondary-dark/90 to-secondary/90 hover:from-secondary-dark/80 hover:to-secondary/80 text-white/95"
	};

	export let color: keyof typeof obj_color_class;
	export let props: Omit<HTMLButtonAttributes, "class"> = {};
	let className = "";
	export { className as class };
</script>

<button
	class="grow basis-0 rounded-md bg-gradient-to-tr from-10% to-90% px-3 py-2 font-semibold shadow-md {obj_color_class[
		color
	]} {className}"
	{...props}
>
	<slot />
</button>
