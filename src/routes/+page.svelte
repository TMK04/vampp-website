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
	<article class="flex gap-5" id="article-input">
		<Container class="h-min min-w-min grow-[1] basis-0">
			<VideoInput />
		</Container>
		<Container class="h-min min-w-min grow-[2] basis-0">
			<TopicInput />
		</Container>
	</article>
</main>
