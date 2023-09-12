<script>
	import ConversationTabPicker from "$lib/ConversationTabPicker/index.svelte";
	import "../app.css";
</script>

<div class="flex">
	<!-- Sidebar -->
	<ConversationTabPicker picked_id="EO53c-Sf2Ak-BVX73Df" />
	<div class="mx-[10%] grow-[3] pb-navbar">
		<nav class="box-content h-navbar text-center">
			<a class="inline-block" href="/">
				<img src="/logo.png" alt="logo" class="h-navbar" />
			</a>
		</nav>
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
