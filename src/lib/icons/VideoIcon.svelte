<script lang="ts">
	import Icon from "./Icon.svelte";

	export let size: number;
	let className = "";
	export { className as class };
</script>

<Icon
	class={className}
	d="m140-800 74 152h130l-74-152h89l74 152h130l-74-152h89l74 152h130l-74-152h112q24 0 42 18t18 42v520q0 24-18 42t-42 18H140q-24 0-42-18t-18-42v-520q0-24 18-42t42-18Zm0 212v368h680v-368H140Zm0 0v368-368Z"
	{size}
/>
