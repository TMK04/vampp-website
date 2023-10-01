<script lang="ts">
	import Fieldset from "./Fieldset.svelte";

	export let disabled = false;
	export let required = false;

	export let ytids_str: string = "";
</script>

<div class="rounded-sm border border-border" id="ytids-input-container">
	<Fieldset id="input-ytids" label="YouTube ID">
		<textarea
			class="block w-full rounded-sm border border-border px-1 py-1.5"
			id="input-ytids"
			name="ytids"
			placeholder="e.g., dQw4w9WgXcQ"
			rows="2"
			bind:value={ytids_str}
			{disabled}
			{required}
		/>
	</Fieldset>
</div>
