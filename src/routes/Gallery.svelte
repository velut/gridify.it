<script lang="ts">
	import { store } from '$lib/store';

	$: images = $store.outputImages;
</script>

<div class="card card-compact grow bg-base-300 shadow">
	<div class="card-body gap-4">
		{#each images as image}
			<div>{image}</div>
		{:else}
			<div class="flex justify-center items-center h-full">
				<div class="btn btn-disabled btn-lg bg-base-300">No Images</div>
			</div>
		{/each}
	</div>
</div>
