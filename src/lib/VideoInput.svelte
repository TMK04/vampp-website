<script lang="ts">
	import VideoIcon from "$lib/VideoIcon.svelte";

	export let video: File | undefined = undefined;
	export let disabled = false;
	$: src = video ? URL.createObjectURL(video) : "";

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files[0]) {
			video = target.files[0];
		}
	}
</script>

<label
	class="relative flex aspect-video cursor-pointer flex-wrap items-center justify-center gap-x-[0.4ch] rounded-sm border border-dashed border-border bg-background p-12 text-center text-xl leading-tight text-secondary"
	for="input-video"
>
	{#if video}
		<!-- svelte-ignore a11y-media-has-caption -->
		<video class="absolute left-0 top-0 h-full w-full rounded-sm object-cover" controls {src} />
	{/if}
	<header
		class="absolute left-0 top-0 flex items-center gap-1.5 rounded-br-sm border-b border-r border-border border-opacity-50 bg-background bg-opacity-95 py-0.5 pl-1 pr-1.5 text-xs shadow-sm"
	>
		<VideoIcon class="inline" size={12} />
		<span>Input Video</span>
	</header>
	<span class="whitespace-nowrap">Click to</span><span>Upload</span>
</label>
<input
	class="hidden"
	id="input-video"
	name="video"
	type="file"
	accept="video/*"
	{disabled}
	on:change={handleFileChange}
/>
