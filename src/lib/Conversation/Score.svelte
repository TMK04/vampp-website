<script lang="ts">
	export let label: string;
	export let score: number;
	let className = "";
	export { className as class };
</script>

<section class="grow rounded-sm border border-border p-4 {className}">
	<header class="mb-1 basis-full text-center font-bold">
		<h1>{label}</h1>
		<p class="text-lg">{Number(score).toFixed(1)}</p>
	</header>
	<p class="flex flex-wrap"><slot /></p>
</section>
