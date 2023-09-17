<script lang="ts">
	import NewConversation from "./NewConversation.svelte";
	import ExistingConversation from "./ExistingConversation.svelte";
	import { conversation_store } from "$lib/stores";

	const conversation = $conversation_store;
</script>

<main class="pt-4">
	{#if conversation === null}
		<NewConversation />
	{:else}
		<ExistingConversation {conversation} />
	{/if}
</main>
