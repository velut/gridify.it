<script lang="ts">
	import type { Image } from '$lib/image';

	export let images: Image[];

	$: singleImage = images[0];
</script>

{#if images.length === 1}
	<div class="flex h-full justify-center">
		<a
			href={singleImage.url}
			target="_blank"
			class="block h-full w-full"
			title={singleImage.file.name}
		>
			<img
				src={singleImage.url}
				alt={singleImage.file.name}
				class="pixelated h-full w-full rounded object-contain"
			/>
		</a>
	</div>
{:else}
	<div class="grid grid-cols-3 gap-4 lg:grid-cols-5 xl:grid-cols-7">
		{#each images as image (image.url)}
			<a href={image.url} target="_blank" class="block h-full w-full" title={image.file.name}>
				<img
					src={image.url}
					alt={image.file.name}
					class="aspect-square h-full w-full rounded object-cover"
				/>
			</a>
		{/each}
	</div>
{/if}
