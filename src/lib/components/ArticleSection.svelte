<script lang="ts">
	let { children } = $props();
</script>

<section class="bg-base-100 prose border-base-content/30 rounded-md border p-8">
	{@render children?.()}
</section>
