<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';

	let { images, preview } = getAppStateContext();
</script>

<!-- https://stackoverflow.com/a/48943583/16109047 -->
<div class="snap-y snap-mandatory md:overflow-y-auto md:[contain:size]">
	{#each images.outputImages as image, index (image.url)}
		{#if index > 0}
			<div class="divider"></div>
		{/if}
		<a href={image.url} target="_blank" title={image.file.name} class="contents">
			<img
				src={image.url}
				alt={image.file.name}
				class={[
					'max-h-full w-full snap-center object-contain object-top-left',
					preview.isPixelArt() && '[image-rendering:pixelated]'
				]}
			/>
		</a>
	{/each}
</div>
