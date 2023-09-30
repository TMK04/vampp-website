<script lang="ts">
	import NewConvo from "./NewConvo/index.svelte";
	import ExistingConvo from "./ExistingConvo/index.svelte";
	import { convo_store } from "$lib/stores";
	import { onDestroy } from "svelte";

	let convo: ConvoType | null;
	const convo_store_unsubcribe = convo_store.subscribe((value) => {
		console.log(value);
		convo = value;
	});

	onDestroy(() => {
		convo_store_unsubcribe();
	});
</script>

<main class="pt-4">
	{#if convo === null}
		<NewConvo />
	{:else}
		<ExistingConvo {convo} />
	{/if}
</main>
