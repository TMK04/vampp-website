<script lang="ts">
	import { id_store } from "$lib/stores";
	import ConvoIcon from "$lib/icons/ConvoIcon.svelte";
	import DeleteBtn from "./DeleteBtn.svelte";

	export let active: boolean;
	export let pitch_topic: string;
	$: title = `Conversation: ${pitch_topic}`;
	export let id: string;

	function handleClick() {
		id_store.set(id);
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
			: ''} {pitch_topic ? '' : 'animate-pulse'}"
	{title}
	type="button"
	on:click={handleClick}
	on:focus={handleFocus}
	on:blur={handleBlur}
	on:mouseover={handleFocus}
	on:mouseout={handleBlur}
>
	<ConvoIcon class="inline" size={17} />
	<!-- Spacing -->
	<span class="inline-block" />
	{pitch_topic || "..."}
	<DeleteBtn {active} {id} show={active || hover} {title} />
</button>
