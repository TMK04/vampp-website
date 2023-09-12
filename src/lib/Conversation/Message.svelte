<script lang="ts">
	import Container from "$lib/Container.svelte";

	export let role: "User" | "Beholder";
</script>

<Container class="text-text">
	<header class="my-2 ms-1 font-bold">{role}:</header>
	<slot />
</Container>
