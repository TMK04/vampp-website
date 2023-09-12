<script lang="ts">
	import Fieldset from "./Fieldset.svelte";

	export let pitch: string = "";
</script>

<Fieldset id="input-pitch" label="Pitch">
	<input
		class="block w-full rounded-sm border border-border px-1 py-1.5"
		id="input-pitch"
		name="pitch"
		type="text"
		required
		bind:value={pitch}
	/>
</Fieldset>
