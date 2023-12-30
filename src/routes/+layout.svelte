<script>
	import Alerts from "$lib/Alerts/index.svelte";
	import ConvoTabPicker from "$lib/ConvoTabPicker/index.svelte";
	import "../app.postcss";
</script>

<div class="flex h-[100vh] overflow-hidden">
	<Alerts />
	<!-- Sidebar -->
	<ConvoTabPicker />
	<div class="grow-[3] overflow-y-auto pb-navbar">
		<slot />
	</div>
</div>
