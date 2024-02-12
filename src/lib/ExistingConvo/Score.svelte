<script lang="ts">
	export let label: string;
	export let score: number | boolean;
	export let format: "1-10 float" | "1-10 int" | "pct" = "1-10 float";
	let className = "";
	export { className as class };

	let formatted_score: string;
	$: switch (typeof score) {
		case "boolean":
			formatted_score = score ? "Yes" : "No";
			break;
		case "number":
			switch (format) {
				case "1-10 float":
					formatted_score = score.toFixed(1);
					break;
				case "1-10 int":
					formatted_score = score.toFixed(0);
					break;
				case "pct":
					formatted_score = `${(score * 100).toFixed(0)}%`;
					break;
			}
	}
</script>

<section
	class="grow rounded-sm border border-border p-4 md:max-w-[70vw] lg:max-w-[55vw] {className}"
>
	<header class="mb-1 basis-full text-center font-bold">
		<h1>{label}</h1>
		<p class="text-lg">{formatted_score}</p>
	</header>
	{#if $$slots.default}
		<p class="flex flex-wrap"><slot /></p>
	{/if}
</section>
