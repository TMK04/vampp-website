<script lang="ts">
	import Container from "$lib/Container.svelte";
	import GradientBtn from "$lib/GradientBtn.svelte";
	import InputsContainer from "$lib/InputsContainer.svelte";
	import OrDivider from "$lib/OrDivider.svelte";
	import TopicInput from "$lib/TopicInput.svelte";
	import VideoInput from "$lib/VideoInput.svelte";
	import YtIdInput from "$lib/YtIdInput.svelte";
	import { setConvo } from "$lib/helpers";
	import { alert_linked_list_store, id_store, obj_id_convo_store } from "$lib/stores";

	let video: File | undefined;
	let topic: string;
	let ytid: string;
	$: ytid_provided = Boolean(ytid);
	$: ytid_required = typeof video === "undefined";

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
		const response = await fetch("/", {
			method: "POST",
			body: formData
		});
		console.log(response);
		let body = await response.json();
		console.log(body);

		if ("type" in body && body.type === "error") {
			alert_linked_list_store.push(body);
			return;
		}

		body = JSON.parse(body);
		obj_id_convo_store.update((obj) => {
			setConvo(obj, body);
			return obj;
		});
		id_store.set(body.id);
	}
</script>

<header class="px-[10%] pb-5 pt-3.5">
	<div class="flex justify-center">
		<a href="/">
			<img src="/logo.png" alt="logo" class="h-navbar" />
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
<section class="bg-background-fade px-[10%]">
	<article class="pb-5 pt-3.5">
		<form
			class="flex h-min min-w-min flex-col gap-4"
			on:reset={handleReset}
			on:submit={handleSubmit}
		>
			<Container>
				<YtIdInput bind:ytid required={ytid_required} />
				<OrDivider />
				<VideoInput bind:video disabled={ytid_provided} />
			</Container>
			<Container>
				<InputsContainer>
					<TopicInput bind:topic />
				</InputsContainer>
			</Container>
			<fieldset class="mt-3 flex flex-row flex-wrap justify-center gap-2">
				<GradientBtn color="primary" props={{ title: "Grade", type: "submit" }}>Grade</GradientBtn>
				<GradientBtn color="secondary" props={{ title: "Reset", type: "reset" }}>Reset</GradientBtn>
			</fieldset>
		</form>
	</article>
</section>
