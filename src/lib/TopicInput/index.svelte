<script lang="ts">
	import Fieldset from "./Fieldset.svelte";

	export let topic: string;
	export let description: string;
	function handleDescriptionInput(event: Event) {
		const target = event.target as HTMLInputElement;
		target.style.height = "0";
		target.style.height = target.scrollHeight + "px";
	}
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
	<Fieldset id="input-description" label="Description">
		<textarea
			class="block max-h-[30vh] min-h-[12ch] w-full rounded-sm border border-border px-1 py-1.5"
			id="input-description"
			name="description"
			required
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
