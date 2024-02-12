<script lang="ts">
	import { PUBLIC_STREAM_DELIMITER } from "$env/static/public";
	import Container from "$lib/Container.svelte";
	import GradientBtn from "$lib/GradientBtn.svelte";
	import InputsContainer from "$lib/InputsContainer.svelte";
	import OrDivider from "$lib/OrDivider.svelte";
	import TopicInput from "$lib/TopicInput.svelte";
	import VideoInput from "$lib/VideoInput.svelte";
	import YtIdsInput from "$lib/YtIdsInput.svelte";
	import { InvalidYtIdsMessage, castYtIdsStr } from "$lib/shared/validate";
	import { alert_linked_list_store, obj_id_convo_store } from "$lib/stores";
	import { logError } from "$server/console";

	let pitch_topic: string;
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
		pitch_topic = "";
		ytids_str = "";
	}

	async function post(formData: FormData) {
		formData.append("pitch_topic", pitch_topic);

		const response = await fetch("/", {
			method: "POST",
			body: formData
		});

		if (!response.ok) {
			alert_linked_list_store.push({
				type: "error",
				title: response.status.toString(),
				message: response.statusText
			});
			return;
		}

		if (!response.body) {
			alert_linked_list_store.push({
				type: "error",
				title: "500",
				message: "Server did not respond" // (did not respond with a body)
			});
			return;
		}

		let id: string;
		/**
		 * Convo while id has not been received
		 */
		const generating_convo = { pitch_topic } as any;
		const writable_stream = new WritableStream({
			write(chunk: string) {
				for (const json_str of chunk.split(PUBLIC_STREAM_DELIMITER).slice(1)) {
					console.info("json_str", json_str);
					JSON.parse(json_str, function (k, v) {
						if (id) {
							obj_id_convo_store.update((obj_id_convo) => {
								(obj_id_convo[id] as any)[k] = v;
								return obj_id_convo;
							});
						} else if (k === "id") {
							id = v;
							obj_id_convo_store.update((obj_id_convo) => {
								obj_id_convo[id] = generating_convo;
								return obj_id_convo;
							});
						} else {
							generating_convo[k] = v;
						}
					});
				}
			},

			close() {
				alert_linked_list_store.push({
					type: "success",
					title: "Success",
					message: `Created Conversation`
				});
			}
		});
		await response.body.pipeThrough(new TextDecoderStream()).pipeTo(writable_stream);
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();

		if (ytids_provided) {
			// No parallelism (server-side doesn't even support it)
			for (const ytid of ytid_arr) {
				const formData = new FormData();
				formData.append("ytid", ytid);
				await post(formData).catch(logError);
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
			<TopicInput bind:pitch_topic />
		</InputsContainer>
	</Container>
	<fieldset class="mt-3 flex flex-row flex-wrap justify-center gap-2">
		<GradientBtn color="primary" props={{ title: "Grade", type: "submit" }}>Grade</GradientBtn>
		<GradientBtn color="secondary" props={{ title: "Reset", type: "reset" }}>Reset</GradientBtn>
	</fieldset>
</form>
