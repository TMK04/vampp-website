<script lang="ts">
	import Fieldset from "$lib/Fieldset.svelte";
</script>

<Fieldset id="pitch_summary" label="Summary">
	<p class="block w-full rounded-sm border border-border px-1 py-1.5" id="pitch_summary">
		<slot />
	</p>
</Fieldset>
