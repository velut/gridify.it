<script lang="ts">
	let { children } = $props();
</script>

<article class="grid gap-4">
	{@render children?.()}
</article>
