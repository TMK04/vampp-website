<script lang="ts">
	import DeleteIcon from "$lib/icons/DeleteIcon.svelte";
	import { id_store, obj_id_conversation_store } from "$lib/stores";

	export let id: string;
	export let show: boolean;

	function handleClick() {
		if ($id_store === id) $id_store = null;
		obj_id_conversation_store.update((obj) => {
			delete obj[id];
			return obj;
		});
	}
</script>

<button
	class="absolute right-3 top-0 h-full transition-opacity {show ? 'opacity-100' : 'opacity-0'}"
	title="Delete"
	type="button"
	on:click={handleClick}
>
	<DeleteIcon size={18} />
</button>
