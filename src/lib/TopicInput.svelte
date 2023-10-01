<script lang="ts">
	import Fieldset from "./Fieldset.svelte";

	export let disabled = false;

	export let topic: string = "";
</script>

<Fieldset id="input-topic" label="Topic">
	<input
		class="block w-full rounded-sm border border-border px-1 py-1.5"
		id="input-topic"
		name="topic"
		type="text"
		placeholder="e.g., Fake News Detection, Service Automation, ..."
		bind:value={topic}
		{disabled}
	/>
</Fieldset>
