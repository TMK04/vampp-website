<script lang="ts">
	export let label: string;
	export let score: number;
	export let justification: string;
</script>

<section class="grow basis-full rounded-sm border border-border p-4 md:basis-1/2 lg:basis-1/4">
	<header class="text-center font-bold">
		<h1>{label}</h1>
		<p class="text-lg">{score}</p>
	</header>
	<p>{justification}</p>
</section>
