<script lang="ts">
	export let id: string;
	export let label: string;
</script>

<fieldset class="p-2.5">
	<label class="mb-1 block text-sm text-secondary" for={id}>{label}</label>
	<slot />
</fieldset>
