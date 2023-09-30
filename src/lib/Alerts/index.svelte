<script lang="ts">
	import { alert_linked_list_store } from "$lib/stores";
	import { onDestroy } from "svelte";
	import Alert from "./Alert.svelte";
	import { linkedListToArr, type LinkedListArrType } from "$lib/LinkedListStore";

	let alert_arr: LinkedListArrType<AlertType> = [];
	const alert_linked_list_store_unsubscribe = alert_linked_list_store.subscribe((linked_list) => {
		alert_arr = linkedListToArr(linked_list);
	});

	onDestroy(() => {
		alert_linked_list_store_unsubscribe();
	});
</script>

<aside class="fixed left-[12.5%] top-0 z-20 w-3/4 md:left-1/4 md:w-1/2 lg:left-1/3 lg:w-1/3">
	{#each alert_arr as { id, data }}
		<Alert {id} {...data} />
	{/each}
</aside>
