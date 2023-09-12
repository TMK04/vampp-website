<script lang="ts">
	import ConversationIcon from "./ConversationIcon.svelte";

	export let active: boolean = false;
	export let handleClick: () => void;
</script>

<button
	class="overflow-hidden overflow-ellipsis whitespace-nowrap rounded-sm py-3 pe-2 ps-3 text-start text-sm text-light hover:bg-secondary-dark/50 {active
		? 'bg-secondary-dark'
		: ''}"
	type="button"
	on:click={handleClick}
>
	<ConversationIcon class="inline" size={17} />
	<!-- Spacing -->
	<span class="inline-block" />
	<slot />
</button>
