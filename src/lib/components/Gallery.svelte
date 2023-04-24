<script lang="ts">
	import GalleryImages from '$lib/components/GalleryImages.svelte';
	import GalleryText from '$lib/components/GalleryText.svelte';
	import { outputImages, outputImagesState } from '$lib/stores';

	$: ({ isPending, isLoaded, isError } = $outputImagesState);
	$: images = $outputImages;
	$: hasNoImages = isLoaded && images.length === 0;
	$: hasImages = isLoaded && images.length > 0;
</script>

<div class="h-96 w-full grow rounded-xl bg-base-300 p-4 shadow sm:h-full">
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
