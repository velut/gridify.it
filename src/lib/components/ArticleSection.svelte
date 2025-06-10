<script lang="ts">
	let { children } = $props();
</script>

<section class="bg-base-100 prose rounded-lg border p-8">
	{@render children?.()}
</section>
