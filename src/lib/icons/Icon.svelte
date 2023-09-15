<script lang="ts">
	export let size: number;
	let className = "";
	export { className as class };
	export let d: string;
</script>

<svg
	class={className}
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 -960 960 960"
	height={size}
	width={size}
>
	<path fill="currentColor" {d} />
</svg>
