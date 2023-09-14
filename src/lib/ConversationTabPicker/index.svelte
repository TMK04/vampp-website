<script lang="ts">
	import { onDestroy, onMount, setContext } from "svelte";
	import {
		id_store,
		obj_id_conversation_store,
		type Id,
		type ObjIdConversation
	} from "$lib/stores";
	import ConversationTab from "./ConversationTab.svelte";
	import NewConversationTab from "./NewConversationTab.svelte";
	import CloseBtn from "./CloseBtn.svelte";
	import OpenBtn from "./OpenBtn.svelte";
	import { setConversation } from "$lib/helpers";

	let obj_id_conversation: ObjIdConversation = {};
	const obj_id_conversation_store_unsubcribe = obj_id_conversation_store.subscribe((obj) => {
		obj_id_conversation = obj;
	});
	let picked_id: Id = null;
	const id_store_unsubcribe = id_store.subscribe((id) => {
		picked_id = id;
	});

	let sidebar_hidden = false;

	onMount(async () => {
		const response = await fetch("/");
		const body = await response.json();
		if (body.type === "error") return console.error(body);

		const dynamo_conversation_arr = JSON.parse(body) as DynamoConversation[];
		const obj_id_conversation: ObjIdConversation = {};
		for (const conversation of dynamo_conversation_arr) {
			setConversation(obj_id_conversation, conversation);
		}

		obj_id_conversation_store.set(obj_id_conversation);
	});

	onDestroy(() => {
		obj_id_conversation_store_unsubcribe();
		id_store_unsubcribe();
	});
</script>

<nav
	class="flex h-full flex-col gap-2 overflow-y-auto bg-background-dark transition-all {sidebar_hidden
		? 'w-0 min-w-0'
		: 'w-1/5 min-w-[250px] p-2'}"
>
	<!-- New Conversation -->
	<div class="mb-2 flex justify-end gap-2">
		<NewConversationTab active={picked_id === null} />
		<CloseBtn bind:sidebar_hidden />
	</div>
	{#each Object.entries(obj_id_conversation) as [id, { topic }]}
		<ConversationTab {id} active={picked_id === id}>
			{topic}
		</ConversationTab>
	{/each}
</nav>

<OpenBtn bind:sidebar_hidden />
