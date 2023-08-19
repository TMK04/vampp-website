<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";

	export let fromColor: string;
	export let toColor: string;
	export let textColor = "white";
	export let type: HTMLButtonAttributes["type"] = "button";
	let className = "";
	export { className as class };
</script>

<button
	class="grow basis-0 rounded-md bg-gradient-to-tr from-{fromColor}/90 from-10% to-{toColor}/90 to-90% px-3 py-2 font-semibold text-{textColor}/95 shadow-md hover:from-{fromColor}/80 hover:to-{toColor}/80 {className}"
	{type}
>
	<slot />
</button>
