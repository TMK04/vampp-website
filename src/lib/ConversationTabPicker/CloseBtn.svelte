<script lang="ts">
	import SidebarIcon from "$lib/icons/SidebarIcon.svelte";
	export let sidebar_hidden;

	function handleClick() {
		sidebar_hidden = true;
	}
</script>

<button
	class="z-10 aspect-square h-full rounded-md border border-border-dark text-light hover:bg-secondary-dark/50"
	on:click={handleClick}
>
	<SidebarIcon class="inline" size={17} />
</button>
