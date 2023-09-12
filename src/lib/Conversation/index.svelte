<script lang="ts">
	import { onDestroy } from "svelte";
	import NewConversation from "./NewConversation.svelte";
	import ExistingConversation from "./ExistingConversation.svelte";
	import { conversation_store } from "$lib/stores";

	let conversation: Conversation | null = null;
	const conversation_store_unsubscribe = conversation_store.subscribe((value) => {
		conversation = value;
	});

	onDestroy(() => {
		conversation_store_unsubscribe();
	});
</script>

<main class="pt-4">
	{#if conversation === null}
		<NewConversation />
	{:else}
		<ExistingConversation {conversation} />
	{/if}
</main>
