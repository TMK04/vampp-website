<script lang="ts">
	import CloseIcon from "$lib/icons/CloseIcon.svelte";
	import { alert_linked_list_store } from "$lib/stores";

	export let id: string;
	export let type: AlertTypeType;
	export let title: string;
	export let message: string;

	const obj_type_class: Record<AlertTypeType, string> = {
		error: "text-error",
		success: "",
		warning: "",
		info: ""
	};

	function handleClick() {
		alert_linked_list_store.pop(id);
	}
</script>

<div
	class="mt-3 flex basis-full items-start gap-1.5 rounded-md border border-b-border-dark/20 border-l-border-dark/20 border-r-border/80 border-t-border/80 bg-light/90 p-3 shadow backdrop-blur"
>
	<button class="mt-1 text-secondary" type="button" on:click={handleClick}
		><CloseIcon size={18} /></button
	>
	<div>
		<header class={`font-bold ${obj_type_class[type]}`}>{title}</header>
		<p>{message}</p>
	</div>
</div>
