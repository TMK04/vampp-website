<script lang="ts">
	import { id_store, obj_id_conversation_store, type ObjIdConversation } from "$lib/stores";
	import ConversationTab from "./ConversationTab/index.svelte";
	import NewConversationTab from "./NewConversationTab.svelte";
	import CloseBtn from "./CloseBtn.svelte";
	import OpenBtn from "./OpenBtn.svelte";
	import { onMount } from "svelte";
	import { setConversation } from "$lib/helpers";

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

		$obj_id_conversation_store = obj_id_conversation;
	});
</script>

<nav
	class="flex h-full flex-col gap-2 overflow-y-auto bg-background-dark transition-all {sidebar_hidden
		? 'w-0 min-w-0'
		: 'w-1/5 min-w-[250px] p-2'}"
>
	<!-- New Conversation -->
	<div class="mb-2 flex justify-end gap-2">
		<NewConversationTab active={$id_store === null} />
		<CloseBtn bind:sidebar_hidden />
	</div>
	{#each Object.entries($obj_id_conversation_store) as [id, { topic }]}
		<ConversationTab {id} active={$id_store === id}>
			{topic}
		</ConversationTab>
	{/each}
</nav>

<OpenBtn bind:sidebar_hidden />
