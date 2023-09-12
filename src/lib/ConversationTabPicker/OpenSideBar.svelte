<script lang="ts">
	import SidebarIcon from "$lib/SidebarIcon.svelte";
	let sidebarVisible = false; // Initial sidebar state

	// Function to open the sidebar
	function openSidebar() {
		const sidebar = document.getElementById("sidebar");
		if (sidebar && sidebar.classList.contains("hidden")) {
			sidebar.classList.remove("hidden");
			sidebarVisible = true; // Update the sidebar state
			openbtn.classList.add("hidden");
		}
	}
</script>

<button
	on:click={openSidebar}
	class="text-gray-600 dark:text-gray-200 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 flex h-11 cursor-pointer items-center gap-3 rounded-md bg-white p-3 text-sm transition-colors duration-200"
	style="pointer-events: auto;"
	id="openbtn"
>
	<SidebarIcon class="inline" size={17} />
</button>
