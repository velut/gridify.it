<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import { cn } from '$lib/utils/cn';

	const { images, preview } = getAppState();
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
