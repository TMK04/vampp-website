<script lang="ts">
	import PlusIcon from "$lib/PlusIcon.svelte";

	export let active: boolean;
	export let handleClick: () => void;
</script>

<button
	class="border-border-dark grow overflow-hidden overflow-ellipsis whitespace-nowrap rounded-md border py-3 pe-2 ps-3 text-start align-middle text-sm text-light {active
		? 'bg-secondary-dark'
		: 'hover:bg-secondary-dark/50'}"
	type="button"
	on:click={handleClick}
>
	<PlusIcon class="inline" size={17} />
	New Conversation
</button>
