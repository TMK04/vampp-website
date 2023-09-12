<script lang="ts">
	import PlusIcon from "$lib/PlusIcon.svelte";

	export let active: boolean = false;
	console.log(active);
</script>

<button
	class="border-border-dark grow overflow-hidden overflow-ellipsis whitespace-nowrap rounded-md border py-3 pe-2 ps-3 text-start align-middle text-sm text-light hover:bg-secondary-dark hover:bg-opacity-50 {active
		? 'bg-secondary-dark'
		: ''}"
	type="button"
>
	<PlusIcon class="inline" size={17} />
	New Conversation
</button>
