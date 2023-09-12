<script lang="ts">
	import Container from "$lib/Container.svelte";
	import InputsContainer from "$lib/InputsContainer.svelte";
	import TextInput from "$lib/TextInput.svelte";
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
		<TextInput text={conversation.text} />
	</InputsContainer>
</Container>

<Container>
	<!-- Scores (creativity, creativity_justification) -->
	<div>Creativity: {conversation.creativity}</div>
	<div>Creativity Justification: {conversation.creativity_justification}</div>

	<div>Impact: {conversation.impact}</div>
	<div>Impact Justification: {conversation.impact_justification}</div>

	<div>Feasibility: {conversation.feasibility}</div>
	<div>Feasibility Justification: {conversation.feasibility_justification}</div>

	<div>Clarity: {conversation.clarity}</div>
	<div>Clarity Justification: {conversation.clarity_justification}</div>
</Container>
