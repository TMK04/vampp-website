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
		<Container class="grow-[1]">
			<VideoInput />
		</Container>
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
