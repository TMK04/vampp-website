<script lang="ts">
	import { id_store, obj_id_convo_store } from "$lib/stores";
	import ConvoTab from "./ConvoTab/index.svelte";
	import NewConvoTab from "./NewConvoTab.svelte";
	import CloseBtn from "./CloseBtn.svelte";
	import OpenBtn from "./OpenBtn.svelte";
	import { onDestroy, onMount } from "svelte";

	let sidebar_hidden = false;

	let obj_id_convo: ObjIdConvo;
	const obj_id_convo_store_unsubscribe = obj_id_convo_store.subscribe((value) => {
		obj_id_convo = value;
	});
	let picked_id: Id;
	const id_store_unsubscribe = id_store.subscribe((value) => {
		picked_id = value;
	});

	onMount(async () => {
		const response = await fetch("/");
		const body = await response.json();
		console.info("GET /", body);
		if (body.type === "error") return console.error(body);

		const obj_id_convo: ObjIdConvo = {};
		for (const { id, ...convo } of body) {
			obj_id_convo[id] = convo;
		}

		obj_id_convo_store.set(obj_id_convo);
	});

	onDestroy(() => {
		obj_id_convo_store_unsubscribe();
		id_store_unsubscribe();
	});
</script>

<nav
	class="absolute z-10 flex h-full flex-col gap-2 overflow-y-auto bg-background-dark transition-all md:static {sidebar_hidden
		? 'w-0 min-w-0'
		: 'w-1/5 min-w-[250px] p-2'}"
>
	<!-- New Convo -->
	<div class="mb-2 flex justify-end gap-2">
		<NewConvoTab active={picked_id === null} />
		<CloseBtn bind:sidebar_hidden />
	</div>
	{#each Object.entries(obj_id_convo).sort((a, b) => b[1].ts - a[1].ts) as [id, { pitch_topic }]}
		<ConvoTab active={picked_id === id} {id} {pitch_topic}>
			{pitch_topic}
		</ConvoTab>
	{/each}
</nav>

<OpenBtn bind:sidebar_hidden />
