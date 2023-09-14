<script lang="ts">
	import Fieldset from "./Fieldset.svelte";

	export let disabled = false;
	export let required = false;
	export let ytid: string = "";
</script>

<div class="rounded-sm border border-border" id="ytid-input-container">
	<Fieldset id="input-ytid" label="YouTube ID">
		<input
			class="block w-full rounded-sm border border-border px-1 py-1.5"
			id="input-ytid"
			name="ytid"
			type="text"
			placeholder="e.g., dQw4w9WgXcQ"
			bind:value={ytid}
			{disabled}
			{required}
		/>
	</Fieldset>
</div>
