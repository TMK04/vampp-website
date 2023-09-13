<script lang="ts">
	export let label: string;
	export let score: number;
</script>

<section class="grow basis-full rounded-sm border border-border p-4 md:basis-1/3 lg:basis-1/4">
	<header class="text-center font-bold">
		<h1>{label}</h1>
		<p class="text-lg">{score.toFixed(1)}</p>
	</header>
	<p><slot /></p>
</section>
