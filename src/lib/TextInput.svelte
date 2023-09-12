<script lang="ts">
	import Fieldset from "./Fieldset.svelte";

	export let text: string = "";
</script>

<Fieldset id="input-text" label="Topic">
	<input
		class="block w-full rounded-sm border border-border px-1 py-1.5"
		id="input-text"
		name="text"
		type="text"
		required
		bind:value={text}
	/>
</Fieldset>
