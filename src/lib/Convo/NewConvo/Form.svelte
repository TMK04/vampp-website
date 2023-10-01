<script lang="ts">
	import Container from "$lib/Container.svelte";
	import GradientBtn from "$lib/GradientBtn.svelte";
	import InputsContainer from "$lib/InputsContainer.svelte";
	import OrDivider from "$lib/OrDivider.svelte";
	import TopicInput from "$lib/TopicInput.svelte";
	import VideoInput from "$lib/VideoInput.svelte";
	import YtIdsInput from "$lib/YtIdsInput.svelte";
	import { setConvo } from "$lib/helpers";
	import { castYtIds } from "$lib/shared/validate";
	import { alert_linked_list_store, obj_id_convo_store } from "$lib/stores";

	let topic: string;
	let video: File | undefined;
	$: ytids_required = typeof video === "undefined";
	let ytids_str: string = "";
	let ytid_arr: string[] = [];
	let prev_error_alert_id: string | null = null;
	let error_i_arr: number[] = [];
	let ytids_provided = false;
	$: {
		const casted_ytids = castYtIds(ytids_str);
		ytid_arr = casted_ytids.ytid_arr;
		error_i_arr = casted_ytids.error_i_arr;
	}
	$: if (ytid_arr.length > 0) {
		ytids_provided = true;
	}
	$: if (error_i_arr.length > 0) {
		if (prev_error_alert_id !== null) {
			alert_linked_list_store.pop(prev_error_alert_id);
		}
		prev_error_alert_id = alert_linked_list_store.push({
			type: "error",
			title: "422",
			message: `Lines ${error_i_arr.join(", ")} are invalid YT IDs`
		});
	} else if (prev_error_alert_id !== null) {
		alert_linked_list_store.pop(prev_error_alert_id);
		prev_error_alert_id = null;
	}

	function handleReset(event: Event) {
		event.preventDefault();
		video = undefined;
		topic = "";
		ytids_str = "";
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();

		const formData = new FormData();

		if (ytids_provided) {
			ytid_arr.forEach((ytid) => formData.append("file", ytid));
		} else if (typeof video === "undefined") {
			alert_linked_list_store.push({
				type: "error",
				title: "422",
				message: "Please provide a video file or a YouTube video ID"
			});
			return;
		} else {
			formData.append("file", video);
		}
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
	}
</script>

<form class="flex h-min min-w-min flex-col gap-4" on:reset={handleReset} on:submit={handleSubmit}>
	<Container>
		<YtIdsInput bind:ytids_str required={ytids_required} />
		<OrDivider />
		<VideoInput bind:video disabled={ytids_provided} />
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
