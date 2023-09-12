<script>
	import ConversationTabPicker from "$lib/ConversationTabPicker/index.svelte";
	import "../app.css";
</script>

<div class="flex">
	<!-- Sidebar -->
	<ConversationTabPicker />
	<div class="mx-[10%] grow-[3] pb-navbar">
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
