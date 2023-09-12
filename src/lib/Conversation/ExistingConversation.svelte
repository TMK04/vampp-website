<script lang="ts">
	import Container from "$lib/Container.svelte";
	import InputsContainer from "$lib/InputsContainer.svelte";
	import TopicInput from "$lib/TopicInput.svelte";

	export let conversation: Conversation;

	console.log(conversation);
</script>

{#if typeof conversation.file === "string"}
	<Container class="text-text">
		<InputsContainer>
			<div class="p-2.5">
				<div class="mb-1 block text-sm">YouTube ID</div>
				<div class="block w-full rounded-sm border border-border bg-background px-1 py-1.5">
					{conversation.file}
				</div>
			</div>
			<TopicInput topic={conversation.topic} />
		</InputsContainer>
	</Container>
{:else}
	<Container>
		<!-- svelte-ignore a11y-media-has-caption -->
	</Container>
{/if}
