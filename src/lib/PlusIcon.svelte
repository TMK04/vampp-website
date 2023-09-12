<script lang="ts">
	export let size: number;
	let className = "";
	export { className as class };
</script>

<svg
	class={className}
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 -960 960 960"
	height={size}
	width={size}
>
	<path fill="currentColor" d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
</svg>
