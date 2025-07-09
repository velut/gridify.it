<script lang="ts">
	let { children } = $props();
</script>

<div class="card">
	<section class="prose">
		{@render children?.()}
	</section>
</div>
