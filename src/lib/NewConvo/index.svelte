<script lang="ts">
	import Logo from "$lib/static/logo.png";
	import Form from "./Form.svelte";
</script>

<header class="px-[10%] pb-5 pt-3.5">
	<div class="flex justify-center">
		<a href="/">
			<img src={Logo} alt="logo" class="h-navbar" />
		</a>
	</div>
	<h1 class="flex flex-wrap items-end justify-center gap-x-1.5 font-bold sm:gap-x-2 sm:gap-y-1">
		<span
			class="whitespace-nowrap bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl text-transparent sm:text-4xl"
		>
			Analyze & Grade
		</span>
		<span class="whitespace-nowrap text-2xl sm:text-3xl">a Pitching Video</span>
	</h1>
</header>
<section class="bg-background-fade px-[10%] pb-5 pt-3.5">
	<Form />
</section>
