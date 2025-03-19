<script lang="ts">
	import GalleryImages from '$lib/components/GalleryImages.svelte';
	import GalleryText from '$lib/components/GalleryText.svelte';
	import { outputImages, outputImagesState } from '$lib/stores';

	$: ({ isPending, isLoaded, isError } = $outputImagesState);
	$: images = $outputImages;
	$: hasNoImages = isLoaded && images.length === 0;
	$: hasImages = isLoaded && images.length > 0;
</script>

<div class="bg-base-300 w-full rounded-xl p-4 shadow sm:h-full sm:grow">
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
