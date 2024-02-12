<script lang="ts">
	import Fieldset from "./Fieldset.svelte";

	export let pitch_topic: string = "";
</script>

<Fieldset id="input-topic" label="Topic">
	<input
		class="block w-full rounded-sm border border-border px-1 py-1.5"
		id="input-topic"
		name="pitch_topic"
		type="text"
		placeholder="e.g., Fake News Detection, Service Automation, ..."
		bind:value={pitch_topic}
	/>
</Fieldset>
