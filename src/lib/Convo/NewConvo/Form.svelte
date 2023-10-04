<script lang="ts">
	import Container from "$lib/Container.svelte";
	import GradientBtn from "$lib/GradientBtn.svelte";
	import InputsContainer from "$lib/InputsContainer.svelte";
	import OrDivider from "$lib/OrDivider.svelte";
	import TopicInput from "$lib/TopicInput.svelte";
	import VideoInput from "$lib/VideoInput.svelte";
	import YtIdsInput from "$lib/YtIdsInput.svelte";
	import { setConvo } from "$lib/helpers";
	import { InvalidYtIdsMessage, castYtIdsStr } from "$lib/shared/validate";
	import { alert_linked_list_store, obj_id_convo_store } from "$lib/stores";

	let topic: string;
	let video: File | undefined;
	$: ytids_required = typeof video === "undefined";
	let ytids_str: string = "";
	let ytid_arr: string[] = [];
	let prev_error_alert_id: string | null = null;
	let error_i_arr: number[] = [];
	$: {
		const casted_ytids = castYtIdsStr(ytids_str);
		ytid_arr = casted_ytids.ytid_arr;
		error_i_arr = casted_ytids.error_i_arr;
	}
	$: ytids_provided = ytid_arr.length > 0;
	$: if (error_i_arr.length > 0) {
		if (prev_error_alert_id !== null) {
			alert_linked_list_store.pop(prev_error_alert_id);
		}

		prev_error_alert_id = alert_linked_list_store.push({
			type: "error",
			title: "422",
			message: InvalidYtIdsMessage(error_i_arr)
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

	async function post(formData: FormData) {
		formData.append("topic", topic);

		const response = await fetch("/", {
			method: "POST",
			body: formData
		});
		console.log(response);
		let body = await response.json();
		if (typeof body === "string") body = JSON.parse(body);

		if ("type" in body && body.type === "error") {
			alert_linked_list_store.push(body);
			return;
		}

		const dynamo_convo = JSON.parse(body) as DynamoConvoType;
		obj_id_convo_store.update((obj) => {
			setConvo(obj, dynamo_convo);
			return obj;
		});

		alert_linked_list_store.push({
			type: "success",
			title: "Success",
			message: `Created Conversation: ${dynamo_convo.topic.S}`
		});
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();

		if (ytids_provided) {
			// No parallelism (server-side doesn't even support it)
			for (const ytid of ytid_arr) {
				const formData = new FormData();
				formData.append("ytid", ytid);
				await post(formData);
			}
			return;
		}

		if (typeof video === "undefined") {
			alert_linked_list_store.push({
				type: "error",
				title: "422",
				message: "Please provide a video file or a YouTube video ID"
			});
			return;
		}

		const formData = new FormData();
		formData.append("video", video);
		await post(formData);
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
