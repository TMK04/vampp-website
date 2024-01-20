<script lang="ts">
	import DeleteIcon from "$lib/icons/DeleteIcon.svelte";
	import { id_store, obj_id_convo_store } from "$lib/stores";

	export let id: string;
	export let show: boolean;
	export let active: boolean;
	export let title: string;

	async function handleClick() {
		if (active) {
			console.info("Active on delete:", id);
			id_store.set(null);
		}
		const response = await fetch(`/${id}`, { method: "DELETE" });
		if (!response.ok) throw new Error(response.statusText);
		obj_id_convo_store.update((obj) => {
			delete obj[id];
			return obj;
		});
	}
</script>

<button
	class=" absolute right-2 top-0 aspect-square h-full bg-secondary-dark/90 text-center text-error backdrop-blur-[1px] transition-all hover:bg-error-dark/95 hover:text-white {show
		? 'opacity-100'
		: 'opacity-0'}"
	title={`Delete ${title}`}
	type="button"
	on:click={handleClick}
>
	<DeleteIcon class="inline" size={18} />
</button>
