<script lang="ts">
	import Container from "$lib/Container.svelte";
	import TopicInput from "$lib/TopicInput/index.svelte";
	import VideoInput from "$lib/VideoInput.svelte";
</script>

<main>
	<h1 class="mb-5 text-center font-bold leading-loose">
		<span
			class="bg-gradient-to-r from-primary to-accent bg-clip-text
		text-4xl text-transparent"
		>
			Analyze & Grade
		</span>
		<br />
		<span class="text-3xl">a Pitching Video</span>
	</h1>
	<form class="flex gap-5" id="article-input">
		<div class="flex grow flex-wrap justify-center gap-4">
			<Container class="basis-full">
				<VideoInput />
			</Container>
			<button
				class="from-secondary-dark/90 hover:from-secondary-dark/75 grow basis-0 rounded-md bg-gradient-to-tr to-secondary/90 px-2.5 py-2 font-semibold text-white/95 shadow-md hover:to-secondary/75"
				type="reset"
			>
				Clear
			</button>
			<button
				class="to-primary-light/90 hover:to-primary-light/80 grow basis-0 rounded-md bg-gradient-to-tr from-primary/90 from-10% to-90% px-2.5 py-2 font-semibold text-white/95 shadow-md hover:from-primary/80"
				type="submit"
			>
				Grade
			</button>
		</div>
		<Container class="grow-[2]">
			<TopicInput />
		</Container>
	</form>
</main>

<style lang="postcss">
	:global(#article-input > *) {
		height: min-content;
		min-width: min-content;
		flex-basis: 0;
	}
</style>
