<script lang="ts">
	import Container from "$lib/Container.svelte";
	import TopicInput from "$lib/TopicInput/index.svelte";
	import VideoInput from "$lib/VideoInput.svelte";
</script>

<main>
	<h1
		class="mb-5 flex flex-wrap items-end justify-center gap-x-1.5 font-bold sm:gap-x-2 sm:gap-y-1"
	>
		<span
			class="whitespace-nowrap bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl text-transparent sm:text-4xl"
		>
			Analyze & Grade
		</span>
		<span class="whitespace-nowrap text-2xl sm:text-3xl">a Pitching Video</span>
	</h1>
	<form class="flex flex-wrap gap-5" id="article-input">
		<div class="grow basis-full md:basis-0">
			<Container class="basis-full">
				<VideoInput />
			</Container>
			<fieldset class="mt-4 flex flex-col flex-wrap justify-center gap-2 sm:flex-row-reverse">
				<button
					class="grow basis-0 rounded-md bg-gradient-to-tr from-primary/90 from-10% to-primary-light/90 to-90% px-2.5 py-2 font-semibold text-white/95 shadow-md hover:from-primary/80 hover:to-primary-light/80"
					type="submit"
				>
					Grade
				</button>
				<button
					class="grow basis-0 rounded-md bg-gradient-to-tr from-secondary-dark/90 to-secondary/90 px-2.5 py-2 font-semibold text-white/95 shadow-md hover:from-secondary-dark/75 hover:to-secondary/75"
					type="reset"
				>
					Clear
				</button>
			</fieldset>
		</div>
		<Container class="grow-[3] basis-full md:basis-0">
			<TopicInput />
		</Container>
	</form>
</main>

<style lang="postcss">
	:global(#article-input > *) {
		height: min-content;
		min-width: min-content;
	}
</style>
