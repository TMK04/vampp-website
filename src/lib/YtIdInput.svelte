<script lang="ts">
	import Fieldset from "./Fieldset.svelte";

	export let disabled = false;
	export let required = false;
	export let ytid: string = "";
</script>

<div class="rounded-sm border border-border" id="ytid-input-container">
	<Fieldset id="input-ytid" label="YouTube ID">
		<textarea
			class="block w-full rounded-sm border border-border px-1 py-1.5"
			id="input-ytid"
			name="ytid"
			placeholder="e.g., dQw4w9WgXcQ"
			rows="2"
			bind:value={ytid}
			{disabled}
			{required}
		/>
	</Fieldset>
</div>
