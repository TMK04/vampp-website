<div class="inputs-container rounded-sm border border-border">
	<slot />
</div>

<style lang="postcss">
	:global(.inputs-container > *:not(:last-child)) {
		border-bottom: 1px solid theme(colors.border);
	}
</style>
