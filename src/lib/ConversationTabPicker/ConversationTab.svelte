<script lang="ts">
	import { id_store } from "$lib/stores";
	import ConversationIcon from "./ConversationIcon.svelte";

	export let id: string;
	export let active: boolean = false;

	function handleClick() {
		id_store.set(id);
	}
</script>

<button
	class="overflow-hidden overflow-ellipsis whitespace-nowrap rounded-sm py-3 pe-2 ps-3 text-start text-sm text-light hover:bg-secondary-dark/50 {active
		? 'bg-secondary-dark'
		: ''}"
	type="button"
	on:click={handleClick}
>
	<ConversationIcon class="inline" size={17} />
	<!-- Spacing -->
	<span class="inline-block" />
	<slot />
</button>
