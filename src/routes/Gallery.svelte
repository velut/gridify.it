<script lang="ts">
	import { outputImages, outputImagesState } from '$lib/stores';
	import GalleryImages from './GalleryImages.svelte';
	import GalleryText from './GalleryText.svelte';

	$: ({ isPending, isLoaded, isError } = $outputImagesState);
	$: images = $outputImages;
	$: hasNoImages = isLoaded && images.length === 0;
	$: hasImages = isLoaded && images.length > 0;
</script>

<div class="h-full w-full grow rounded-xl bg-base-300 p-4 shadow">
	{#if isPending}
		<GalleryText text="Loading images..." />
	{:else if hasNoImages}
		<GalleryText text="No images" />
	{:else if hasImages}
		<GalleryImages {images} />
	{:else if isError}
		<GalleryText text="Error loading images" />
	{:else}
		<GalleryText text="Unknown state" />
	{/if}
</div>
