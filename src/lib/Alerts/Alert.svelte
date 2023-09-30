<script lang="ts">
	import CloseIcon from "$lib/icons/CloseIcon.svelte";
	import { alert_linked_list_store, obj_alert_type_memoized } from "$lib/stores";

	export let id: string;
	export let type: AlertTypeType;
	let titleProp: string;
	export { titleProp as title };
	export let message: string;

	const obj_type_class: Record<AlertTypeType, string> = {
		error: "text-error",
		success: "text-success",
		warning: "text-warning",
		info: "text-info"
	};

	function handleClick() {
		alert_linked_list_store.pop(id);
	}
</script>

<div
	class="mt-3 flex basis-full items-start gap-1.5 rounded-md border border-b-border-dark/20 border-l-border-dark/20 border-r-border/80 border-t-border/80 bg-light/90 p-3 shadow backdrop-blur"
>
	<button
		class="mt-1 text-secondary hover:text-secondary-dark"
		type="button"
		on:click={handleClick}
	>
		<CloseIcon size={18} />
	</button>
	<div>
		<header class={`font-bold ${obj_type_class[type]}`}>
			{obj_alert_type_memoized[type].capitalized}
			{#if titleProp}
				: {titleProp}
			{/if}
		</header>
		<p>{message}</p>
	</div>
</div>
