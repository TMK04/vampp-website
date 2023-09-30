<script>
	import ConvoTabPicker from "$lib/ConvoTabPicker/index.svelte";
	import "../app.css";
</script>

<div class="flex h-[100vh] overflow-hidden">
	<!-- Sidebar -->
	<ConvoTabPicker />
	<div class="grow-[3] overflow-y-auto pb-navbar">
		<slot />
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.background);
		color: theme(colors.text);
		fill: theme(colors.text);
	}
</style>
