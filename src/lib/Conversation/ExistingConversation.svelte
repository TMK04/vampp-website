<script lang="ts">
	import Container from "$lib/Container.svelte";
	import InputsContainer from "$lib/InputsContainer.svelte";
	import TopicInput from "$lib/TopicInput.svelte";
	import VideoInput from "$lib/VideoInput.svelte";
	import YtIdInput from "$lib/YtIdInput.svelte";

	export let conversation: Conversation;

	console.log(conversation);
</script>

<Container class="text-text">
	<InputsContainer>
		{#if typeof conversation.file === "string"}
			<YtIdInput disabled ytid={conversation.file} />
		{:else}
			<VideoInput disabled video={conversation.file} />
		{/if}
		<TopicInput topic={conversation.topic} />
	</InputsContainer>
</Container>
