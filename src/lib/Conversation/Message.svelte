<script lang="ts">
	import Container from "$lib/Container.svelte";

	export let role: "User" | "Beholder";
	const obj_role_class = {
		User: "text-primary",
		Beholder: "text-accent"
	};
</script>

<Container class="text-text">
	<header class="my-2 ms-1 font-bold {obj_role_class[role]}">{role}:</header>
	<slot />
</Container>
