<script lang="ts">
	import PlusIcon from "$lib/icons/PlusIcon.svelte";
	import { id_store } from "$lib/stores";

	export let active: boolean;

	function handleClick() {
		$id_store = null;
	}
</script>

<button
	class="grow overflow-hidden overflow-ellipsis whitespace-nowrap rounded-md border border-border-dark py-3 pe-2 ps-3 text-start align-middle text-sm text-light {active
		? 'bg-secondary-dark'
		: 'hover:bg-secondary-dark/50'}"
	title="New Conversation"
	type="button"
	on:click={handleClick}
>
	<PlusIcon class="inline" size={17} />
	New Conversation
</button>
