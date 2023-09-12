<script lang="ts">
	import SidebarIcon from "$lib/SidebarIcon.svelte";
	let sidebarVisible = true; // Initial sidebar state

	// Function to toggle the sidebar
	function toggleSidebar() {
		const sidebar = document.getElementById("sidebar");
		const openbtn = document.getElementById("openbtn");
		if (sidebar) {
			sidebar.classList.toggle("hidden");
			sidebarVisible = !sidebarVisible; // Update the sidebar state
			openbtn!.classList.remove("hidden");
		}
	}
</script>

<button
	class="z-10 aspect-square h-full rounded-md border border-border-dark text-light hover:bg-secondary-dark/50"
	on:click={toggleSidebar}
>
	<SidebarIcon class="inline" size={17} />
</button>
