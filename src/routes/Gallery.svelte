<script lang="ts">
	type Image = { filename: string; url: string };
	const images: Image[] = [];
</script>

<div class="card card-compact grow bg-base-300 shadow">
	<div class="card-body gap-4">
		{#each images as image}
			<div>{image.url}</div>
		{:else}
			<div class="flex justify-center items-center h-full">
				<div class="btn btn-disabled btn-lg bg-base-300">No Images</div>
			</div>
		{/each}
	</div>
</div>
