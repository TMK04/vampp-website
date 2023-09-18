<script lang="ts">
	import NewConversation from "./NewConversation.svelte";
	import ExistingConversation from "./ExistingConversation.svelte";
	import { conversation_store } from "$lib/stores";
	import { onDestroy } from "svelte";

	let conversation: Conversation | null;
	const conversation_store_unsubcribe = conversation_store.subscribe((value) => {
		conversation = value;
	});

	onDestroy(() => {
		conversation_store_unsubcribe();
	});
</script>

<main class="pt-4">
	{#if conversation === null}
		<NewConversation />
	{:else}
		<ExistingConversation {conversation} />
	{/if}
</main>
