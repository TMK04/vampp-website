<script lang="ts">
	import Container from "$lib/Container.svelte";
	import GradientBtn from "$lib/GradientBtn.svelte";
	import OrDivider from "$lib/OrDivider.svelte";
	import TopicInput from "$lib/TopicInput.svelte";
	import VideoInput from "$lib/VideoInput.svelte";
	import YtIdInput from "$lib/YtIdInput.svelte";

	let video: File | undefined;
	let topic: string;
	let ytid: string;
	$: ytid_provided = Boolean(ytid);

	function handleReset(event: Event) {
		event.preventDefault();
		video = undefined;
		topic = "";
		ytid = "";
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();
		const file = ytid_provided ? ytid : video;
		if (!file) return;
		const formData = new FormData();
		formData.append("file", file);
		formData.append("topic", topic);
		console.log(formData);
		const response = await fetch("?/receive_video", {
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
		class="flex flex-col gap-4"
		id="article-input"
		on:reset={handleReset}
		on:submit={handleSubmit}
	>
		<Container>
			<YtIdInput bind:ytid />
			<OrDivider />
			<VideoInput bind:video disabled={ytid_provided} />
		</Container>
		<Container>
			<TopicInput bind:topic />
		</Container>
		<fieldset class="mt-3 flex flex-row flex-wrap justify-center gap-2">
			<GradientBtn color="primary" type="submit">Grade</GradientBtn>
			<GradientBtn color="secondary" type="reset">Reset</GradientBtn>
		</fieldset>
	</form>
</main>

<style lang="postcss">
	:global(#article-input > *) {
		height: min-content;
		min-width: min-content;
	}
</style>
