<script lang="ts">
	import { onDestroy, setContext } from "svelte";
	import {
		id_store,
		obj_id_conversation_store,
		type Id,
		type ObjIdConversation
	} from "$lib/stores";
	import ConversationTab from "./ConversationTab.svelte";
	import NewConversationTab from "./NewConversationTab.svelte";
	import CloseBtn from "./ToggleBtn.svelte";

	let obj_id_conversation: ObjIdConversation = {};
	const obj_id_conversation_store_unsubcribe = obj_id_conversation_store.subscribe((obj) => {
		obj_id_conversation = obj;
	});
	let picked_id: Id = null;
	const id_store_unsubcribe = id_store.subscribe((id) => {
		picked_id = id;
	});

	onDestroy(() => {
		obj_id_conversation_store_unsubcribe();
		id_store_unsubcribe();
	});
</script>

<nav class="w-1/5 bg-background-dark">
	<div class="flex flex-col gap-2 p-2">
		<!-- New Conversation -->
		<div class="mb-2 flex flex-wrap-reverse justify-end gap-2">
			<NewConversationTab active={picked_id === null} />
			<CloseBtn />
		</div>
		{#each Object.entries(obj_id_conversation) as [id, { topic }]}
			<ConversationTab {id} active={picked_id === id}>
				{topic}
			</ConversationTab>
		{/each}
	</div>
</nav>
