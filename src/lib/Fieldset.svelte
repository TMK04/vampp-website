<script lang="ts">
	let className = "";
	export { className as class };
	export let id: string;
	export let label: string;
</script>

<fieldset class="p-2.5 {className}">
	<label class="mb-1 block text-sm text-secondary" for={id}>{label}</label>
	<slot />
</fieldset>
