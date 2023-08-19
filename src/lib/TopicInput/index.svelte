<script lang="ts">
	import Fieldset from "./Fieldset.svelte";

	let topic: string;
	let description: string;
	function handleDescriptionInput(event: Event) {
		const target = event.target as HTMLInputElement;
		target.style.height = "0";
		target.style.height = target.scrollHeight + "px";
	}
</script>

<div class="border-border rounded-sm border" id="topic-input-container">
	<Fieldset id="input-topic" label="Topic">
		<input
			class="border-border block w-full rounded-sm border px-1 py-1.5"
			id="input-topic"
			name="topic"
			type="text"
			placeholder="e.g., Fake News Detection, Service Automation, ..."
			bind:value={topic}
		/>
	</Fieldset>
	<Fieldset id="input-description" label="Description">
		<textarea
			class="border-border block max-h-[30vh] min-h-[12ch] w-full rounded-sm border px-1 py-1.5"
			id="input-description"
			name="description"
			bind:value={description}
			on:input={handleDescriptionInput}
		/>
	</Fieldset>
</div>

<style lang="postcss">
	:global(#topic-input-container > *:not(:last-child)) {
		border-bottom: 1px solid theme(colors.border);
	}
</style>
