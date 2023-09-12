<script lang="ts">
	import SidebarIcon from "$lib/SidebarIcon.svelte";
	let sidebarVisible = false; // Initial sidebar state

	// Function to open the sidebar
    function openSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('hidden')) {
            sidebar.classList.remove('hidden');
            sidebarVisible = true; // Update the sidebar state
            openbtn.classList.add('hidden');
        }
    }
</script>


<button
	on:click={openSidebar}
	class="hidden flex p-3 items-center gap-3 transition-colors duration-200 text-gray-600 dark:text-gray-200 cursor-pointer text-sm rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 h-11"
	style="pointer-events: auto;"
    id = "openbtn"
>
	<SidebarIcon class="inline" size={17} />
</button>