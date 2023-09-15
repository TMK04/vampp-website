<script lang="ts">
	import Icon from "./Icon.svelte";

	export let size: number;
	let className = "";
	export { className as class };
</script>

<Icon class={className} d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" {size} />
