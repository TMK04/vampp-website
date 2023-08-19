<script lang="ts">
	import Fieldset from "./Fieldset.svelte";

	let topic: string;

	function handleTopicInput(event: Event) {
		const target = event.target as HTMLInputElement;
		topic = target.value;
	}
</script>

<form class="border-border rounded-sm border" id="topic-input-container">
	<Fieldset id="input-topic" label="Topic">
		<input
			class="border-border block w-full rounded-sm border px-1 py-1.5"
			id="input-topic"
			type="text"
			placeholder="e.g., Fake News Detection, Service Automation, ..."
			on:change={handleTopicInput}
		/>
	</Fieldset>
	<Fieldset id="input-description" label="Description">
		<textarea
			class="border-border block w-full rounded-sm border px-1 py-1.5"
			id="input-description"
		/>
	</Fieldset>
</form>

<style lang="postcss">
	:global(#topic-input-container > *:not(:last-child)) {
		border-bottom: 1px solid theme(colors.border);
	}
</style>
