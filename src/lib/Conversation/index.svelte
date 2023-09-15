<script lang="ts">
	import NewConversation from "./NewConversation.svelte";
	import ExistingConversation from "./ExistingConversation.svelte";
	import { conversation_store } from "$lib/stores";
</script>

<main class="pt-4">
	{#if $conversation_store === null}
		<NewConversation />
	{:else}
		<ExistingConversation conversation={$conversation_store} />
	{/if}
</main>
