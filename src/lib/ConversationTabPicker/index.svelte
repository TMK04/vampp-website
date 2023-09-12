<script lang="ts">
	import { onDestroy, onMount, setContext } from "svelte";
	import { obj_id_conversation_store, type ObjIdConversation } from "../../stores";
	import ConversationTab from "./ConversationTab.svelte";
	import NewConversationTab from "./NewConversationTab.svelte";
	import CloseBtn from "./ToggleBtn.svelte";

	let picked_id: string | null = null;
	$: picked_null = picked_id === null;
	let obj_id_conversation: ObjIdConversation = {};
	const unsubcribe = obj_id_conversation_store.subscribe((obj) => {
		obj_id_conversation = obj;
	});

	function handleClickFactory(id: string | null) {
		return function handleClick() {
			picked_id = id;
			setContext("conversation", id === null ? null : obj_id_conversation[id]);
		};
	}

	onMount(() => {
		obj_id_conversation_store.update((obj) => {
			obj["EO53c-Sf2Ak-BVX73Df"] = {
				topic: "Automation of Server Health Check-Ups and API Integration",
				file: "EO53c-Sf2Ak"
			};
			obj["_JTd4rwRLgY-6RkYAmG"] = {
				topic: "Cybersecurity For Seniors",
				file: "_JTd4rwRLgY"
			};
			obj["B2Ft9Lk79D0-6XFwaKM"] = {
				topic: "End User Devices Dashboard",
				file: "B2Ft9Lk79D0"
			};
			return obj;
		});
	});

	onDestroy(() => {
		unsubcribe();
	});
</script>

<nav class="bg-background-dark w-1/5">
	<div class="fixed flex h-[100vh] w-1/5 flex-col gap-2 p-2">
		<!-- New Conversation -->
		<div class="mb-2 flex flex-wrap-reverse justify-end gap-2">
			<NewConversationTab active={picked_null} handleClick={handleClickFactory(null)} />
			<CloseBtn />
		</div>
		{#each Object.entries(obj_id_conversation) as [id, { topic }]}
			<ConversationTab active={picked_id === id} handleClick={handleClickFactory(id)}>
				{topic}
			</ConversationTab>
		{/each}
	</div>
</nav>
