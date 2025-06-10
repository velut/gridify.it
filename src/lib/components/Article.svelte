<script lang="ts">
	let { children } = $props();
</script>

<article class="grid gap-8">
	{@render children?.()}
</article>
