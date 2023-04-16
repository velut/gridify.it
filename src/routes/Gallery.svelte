<script lang="ts">
	import { inputImages, inputImagesState } from '$lib/stores';
	import GalleryImage from './GalleryImage.svelte';
	import GalleryText from './GalleryText.svelte';
</script>

<div class="card card-compact grow bg-base-300 shadow">
	<div class="card-body gap-4">
		{#if $inputImagesState?.isPending}
			<GalleryText text="Loading images..." />
		{:else if $inputImagesState?.isLoaded}
			{#each $inputImages as image}
				<GalleryImage {image} />
			{:else}
				<GalleryText text="No images" />
			{/each}
		{:else if $inputImagesState?.isError}
			<GalleryText text="Error loading images" />
		{/if}
	</div>
</div>
