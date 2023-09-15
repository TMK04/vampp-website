<script lang="ts">
	import { id_store, obj_id_conversation_store } from "$lib/stores";
	import ConversationIcon from "$lib/icons/ConversationIcon.svelte";
	import DeleteBtn from "./DeleteBtn.svelte";

	export let id: string;
	$: title = `Conversation: ${$obj_id_conversation_store[id]!.topic}`;
	export let active: boolean = false;

	function handleClick() {
		$id_store = id;
	}

	let hover = false;
	function handleFocus() {
		hover = true;
	}
	function handleBlur() {
		hover = false;
	}
</script>

<button
	class="relative overflow-hidden overflow-ellipsis whitespace-nowrap rounded-sm py-3 pe-2 ps-3 text-start text-sm text-light {active
		? 'bg-secondary-dark'
		: hover
		? 'bg-secondary-dark/50'
		: ''}"
	{title}
	type="button"
	on:click={handleClick}
	on:focus={handleFocus}
	on:blur={handleBlur}
	on:mouseover={handleFocus}
	on:mouseout={handleBlur}
>
	<ConversationIcon class="inline" size={17} />
	<!-- Spacing -->
	<span class="inline-block" />
	<slot />
	<DeleteBtn {id} show={active || hover} {title} />
</button>
