<script lang="ts">
	import Container from "$lib/Container.svelte";
	import GradientBtn from "$lib/GradientBtn.svelte";
	import InputsContainer from "$lib/InputsContainer.svelte";
	import OrDivider from "$lib/OrDivider.svelte";
	import TopicInput from "$lib/TopicInput.svelte";
	import VideoInput from "$lib/VideoInput.svelte";
	import YtIdInput from "$lib/YtIdInput.svelte";
	import { id_store, obj_id_conversation_store } from "$lib/stores";

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
		let body = await response.json();
		if (body.type === "error") return console.error(body);

		body = JSON.parse(body.data);
		console.log(body);
		obj_id_conversation_store.update((obj) => {
			obj["test"] = {
				file,
				topic,
				text: body.text.S,
				creativity: body.creativity.N,
				creativity_justification: body.creativity_justification.S,
				impact: body.impact.N,
				impact_justification: body.impact_justification,
				feasibility: body.feasibility.N,
				feasibility_justification: body.feasibility_justification.S,
				clarity: body.clarity.N,
				clarity_justification: body.clarity_justification.S
			};
			return obj;
		});
		id_store.set("test");
	}
</script>

<a class="block" href="/">
	<img src="/logo.png" alt="logo" class="mx-auto h-navbar" />
</a>
<h1 class="mb-5 flex flex-wrap items-end justify-center gap-x-1.5 font-bold sm:gap-x-2 sm:gap-y-1">
	<span
		class="whitespace-nowrap bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl text-transparent sm:text-4xl"
	>
		Analyze & Grade
	</span>
	<span class="whitespace-nowrap text-2xl sm:text-3xl">a Pitching Video</span>
</h1>
<form class="flex h-min min-w-min flex-col gap-4" on:reset={handleReset} on:submit={handleSubmit}>
	<Container>
		<YtIdInput bind:ytid />
		<OrDivider />
		<VideoInput bind:video disabled={ytid_provided} />
	</Container>
	<Container>
		<InputsContainer>
			<TopicInput bind:topic />
		</InputsContainer>
	</Container>
	<fieldset class="mt-3 flex flex-row flex-wrap justify-center gap-2">
		<GradientBtn color="primary" type="submit">Grade</GradientBtn>
		<GradientBtn color="secondary" type="reset">Reset</GradientBtn>
	</fieldset>
</form>
