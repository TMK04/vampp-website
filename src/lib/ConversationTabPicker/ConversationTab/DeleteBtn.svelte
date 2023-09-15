<script lang="ts">
	import DeleteIcon from "$lib/icons/DeleteIcon.svelte";
	import { id_store, obj_id_conversation_store } from "$lib/stores";

	export let id: string;
	export let show: boolean;
	export let title: string;

	function handleClick() {
		if ($id_store === id) $id_store = null;
		obj_id_conversation_store.update((obj) => {
			delete obj[id];
			return obj;
		});
	}
</script>

<button
	class=" hover:bg-error-dark/95 text-error absolute right-2 top-0 aspect-square h-full bg-secondary-dark/90 text-center backdrop-blur-[1px] transition-all hover:text-white {show
		? 'opacity-100'
		: 'opacity-0'}"
	title={`Delete ${title}`}
	type="button"
	on:click={handleClick}
>
	<DeleteIcon class="inline" size={18} />
</button>
