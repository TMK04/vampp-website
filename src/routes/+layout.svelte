<script>
	import "../app.css";
</script>

<div class="mx-[10%]">
	<nav class="h-navbar box-content text-center">
		<a class="inline-block" href="/">
			<img src="/logo.png" alt="logo" class="h-navbar" />
		</a>
	</nav>
	<slot />
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.background);
	}
</style>
