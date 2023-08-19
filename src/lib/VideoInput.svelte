<script lang="ts">
	import { onMount } from "svelte";
	import VideoIcon from "$lib/VideoIcon.svelte";

	let file: File;

	function handleFileInput(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files[0]) {
			file = target.files[0];
		}
	}

	function handleUpload() {
		if (file) {
			// TODO: Implement upload logic
			console.log(`Uploading file: ${file.name}`);
		}
	}

	onMount(() => {
		// TODO: Initialize any necessary variables or components
	});
</script>

<label
	class="border-border relative flex aspect-video cursor-pointer items-center justify-center rounded-sm border border-dashed bg-background p-10 text-center text-xl leading-tight text-secondary"
	for="input-video"
>
	<header
		class="border-border absolute left-0 top-0 flex items-center gap-1.5 rounded-br-sm border-b border-r border-opacity-50 py-0.5 pl-1 pr-1.5 text-xs shadow-sm"
	>
		<VideoIcon class="inline" size={12} />
		<span>Input Video</span>
	</header>
	Click to Upload
</label>
<input
	class="hidden"
	id="input-video"
	name="video"
	type="file"
	accept="video/*"
	on:change={handleFileInput}
/>
