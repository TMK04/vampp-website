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
		let body = await response.json();
		if (body.type === "error") return console.error(body);

		body = JSON.parse(body);
		const obj_id_conversation: ObjIdConversation = {};
		for (const { id, ...conversation } of body) {
			obj_id_conversation[id.S] = {
				topic: conversation.topic.S,
				file: conversation.file.S,
				pitch: conversation.pitch.S,
				pe: conversation.pe.N,
				clarity: conversation.clarity.N,
				bv: conversation.bv.N,
				beholder_creativity: conversation.beholder_creativity.N,
				beholder_creativity_justification: conversation.beholder_creativity_justification.S,
				beholder_impact: conversation.beholder_impact.N,
				beholder_impact_justification: conversation.beholder_impact_justification.S,
				beholder_feasibility: conversation.beholder_feasibility.N,
				beholder_feasibility_justification: conversation.beholder_feasibility_justification.S,
				beholder_clarity: conversation.beholder_clarity.N,
				beholder_clarity_justification: conversation.beholder_clarity_justification.S
			};
		}

		obj_id_conversation_store.set(obj_id_conversation);
	});

	onDestroy(() => {
		obj_id_conversation_store_unsubcribe();
		id_store_unsubcribe();
	});
</script>

<nav
	class="flex h-full flex-col gap-2 overflow-y-auto bg-background-dark p-2 transition-all {sidebar_hidden
		? 'w-0 min-w-0 overflow-hidden'
		: 'w-1/5 min-w-[250px]'}"
>
	<!-- New Conversation -->
	<div class="mb-2 flex flex-wrap-reverse justify-end gap-2">
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
