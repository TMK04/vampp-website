<script>
	import "../app.css";
</script>

<div class="mx-[10%]">
	<header class="box-content h-[80px]">
		<a href="/">
			<img src="/logo.png" alt="logo" class="h-full mx-auto" />
		</a>
	</header>
	<slot />
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.background);
	}
</style>
