<script lang="ts">
	import { id_store, obj_id_conversation_store } from "$lib/stores";
	import ConversationTab from "./ConversationTab/index.svelte";
	import NewConversationTab from "./NewConversationTab.svelte";
	import CloseBtn from "./CloseBtn.svelte";
	import OpenBtn from "./OpenBtn.svelte";
	import { onDestroy, onMount } from "svelte";
	import { setConversation } from "$lib/helpers";

	let sidebar_hidden = false;

	let obj_id_conversation: ObjIdConversation;
	const obj_id_conversation_store_unsubscribe = obj_id_conversation_store.subscribe((value) => {
		obj_id_conversation = value;
	});
	let picked_id: Id;
	const id_store_unsubscribe = id_store.subscribe((value) => {
		picked_id = value;
	});

	onMount(async () => {
		const response = await fetch("/");
		const body = await response.json();
		console.log(body);
		if (body.type === "error") return console.error(body);

		const obj_id_conversation: ObjIdConversation = {};
		for (const conversation of body) {
			setConversation(obj_id_conversation, conversation);
		}

		obj_id_conversation_store.set(obj_id_conversation);
	});

	onDestroy(() => {
		obj_id_conversation_store_unsubscribe();
		id_store_unsubscribe();
	});
</script>

<nav
	class="absolute z-10 flex h-full flex-col gap-2 overflow-y-auto bg-background-dark transition-all md:static {sidebar_hidden
		? 'w-0 min-w-0'
		: 'w-1/5 min-w-[250px] p-2'}"
>
	<!-- New Conversation -->
	<div class="mb-2 flex justify-end gap-2">
		<NewConversationTab active={picked_id === null} />
		<CloseBtn bind:sidebar_hidden />
	</div>
	{#each Object.entries(obj_id_conversation) as [id, { topic }]}
		<ConversationTab active={picked_id === id} {id} {topic}>
			{topic}
		</ConversationTab>
	{/each}
</nav>

<OpenBtn bind:sidebar_hidden />
