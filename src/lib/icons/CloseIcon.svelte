<script lang="ts">
	import Icon from "./Icon.svelte";

	export let size: number;
	let className = "";
	export { className as class };
</script>

<Icon
	class={className}
	d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
	{size}
/>
