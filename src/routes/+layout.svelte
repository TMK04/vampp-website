<script>
	import "../app.css";
</script>

<div class="mx-[10%] pb-navbar">
	<nav class="box-content h-navbar text-center">
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
