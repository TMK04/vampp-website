<script lang="ts">
	export let label: string;
	export let score: number;

	const obj_level_class = {
		0: "md:basis-1/3 lg:basis-1/4",
		1: ""
	};
	export let level: keyof typeof obj_level_class = 0;
</script>

<section class="grow basis-full rounded-sm border border-border p-4 {obj_level_class[level]}">
	<header class="text-center font-bold">
		<h1>{label}</h1>
		<p class="text-lg">{Number(score).toFixed(1)}</p>
	</header>
	<p><slot /></p>
</section>
