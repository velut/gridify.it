<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import { cn } from '$lib/cn';

	const { images, preview } = getAppStateContext();
</script>

<div class="overflow-y-auto lg:snap-y lg:snap-mandatory">
	{#each images.outputImages as image, index (image.url)}
		{#if index > 0}
			<div class="bg-border my-6 h-[1px] w-full"></div>
		{/if}
		<a href={image.url} target="_blank" title={image.file.name} class="contents">
			<img
				src={image.url}
				alt={image.file.name}
				class={cn(
					'max-h-full w-full object-contain object-top-left lg:snap-center',
					preview.isPixelArt() && '[image-rendering:pixelated]'
				)}
			/>
		</a>
	{/each}
</div>
