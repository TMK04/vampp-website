<script lang="ts">
	import SidebarIcon from "$lib/icons/SidebarIcon.svelte";
	export let sidebar_hidden: boolean;
	$: hidden = !sidebar_hidden;

	function handleClick() {
		sidebar_hidden = false;
	}
</script>

<button
	on:click={handleClick}
	class="text-gray-600 dark:text-gray-200 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 absolute left-2 top-2 z-10 flex h-11 cursor-pointer items-center gap-3 rounded-md bg-white p-3 text-sm transition-colors duration-200"
	class:hidden
	title="Open Tab Picker"
	type="button"
>
	<SidebarIcon class="inline" size={17} />
</button>
