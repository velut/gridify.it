<script lang="ts">
	let { children } = $props();
</script>

<article class="**:text-card-foreground grid gap-6">
	{@render children?.()}
</article>
