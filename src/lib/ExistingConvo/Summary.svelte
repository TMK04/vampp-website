<script lang="ts">
	import Fieldset from "$lib/Fieldset.svelte";

	export let pitch_summary: string;
</script>

{#if pitch_summary}
	<Fieldset id="pitch_summary" label="Summary">
		<p class="block w-full rounded-sm border border-border px-1 py-1.5" id="pitch_summary">
			{pitch_summary}
		</p>
	</Fieldset>
{:else}
	<Fieldset class="animate-pulse" id="pitch_summary" label="Summary">
		<p class="block h-[2ch] w-full rounded-sm border border-border px-1 py-1.5" />
	</Fieldset>
{/if}
