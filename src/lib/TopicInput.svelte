<script lang="ts">
	import Fieldset from "./Fieldset.svelte";

	export let topic: string = "";
</script>

<div class="rounded-sm border border-border" id="topic-input-container">
	<Fieldset id="input-topic" label="Topic">
		<input
			class="block w-full rounded-sm border border-border px-1 py-1.5"
			id="input-topic"
			name="topic"
			type="text"
			placeholder="e.g., Fake News Detection, Service Automation, ..."
			required
			bind:value={topic}
		/>
	</Fieldset>
</div>

<style lang="postcss">
	:global(#topic-input-container > *:not(:last-child)) {
		border-bottom: 1px solid theme(colors.border);
	}
</style>
