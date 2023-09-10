<script lang="ts">
	import Container from "$lib/Container.svelte";
	import GradientBtn from "$lib/GradientBtn.svelte";
	import TopicInput from "$lib/TopicInput/index.svelte";
	import VideoInput from "$lib/VideoInput.svelte";

	let file: File | undefined;
	let topic: string;

	function handleReset(event: Event) {
		event.preventDefault();
		file = undefined;
		topic = "";
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();
		if (!file) return;
		const formData = new FormData();
		formData.append("file", file);
		formData.append("topic", topic);
		console.log(formData);
		const response = fetch("?/receive_video", {
			method: "POST",
			body: formData
		});
		console.log(response);
	}
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
	<form
		class="flex flex-wrap gap-5"
		id="article-input"
		on:reset={handleReset}
		on:submit={handleSubmit}
	>
		<div class="grow basis-full md:basis-0">
			<Container class="basis-full">
				<VideoInput bind:file />
			</Container>
			<fieldset class="mt-4 flex flex-row flex-wrap justify-center gap-2">
				<GradientBtn color="primary" type="submit">Grade</GradientBtn>
				<GradientBtn color="secondary" type="reset">Reset</GradientBtn>
			</fieldset>
		</div>
		<Container class="grow-[3] basis-full md:basis-0">
			<TopicInput bind:topic />
		</Container>
	</form>
</main>

<style lang="postcss">
	:global(#article-input > *) {
		height: min-content;
		min-width: min-content;
	}
</style>
