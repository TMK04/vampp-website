<script lang="ts">
	import Fieldset from "./Fieldset.svelte";

	export let pitch_content: string = "";
</script>

<Fieldset id="input-pitch" label="Pitch">
	<textarea
		class="block w-full rounded-sm border border-border px-1 py-1.5"
		id="input-pitch"
		name="pitch_content"
		rows={10}
		required
		bind:value={pitch_content}
	/>
</Fieldset>
