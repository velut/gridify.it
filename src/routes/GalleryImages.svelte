<script lang="ts">
	import type { Image } from '$lib/image';

	export let images: Image[];
</script>

<div class="grid grid-cols-3 gap-4 lg:grid-cols-5 xl:grid-cols-7">
	{#each images as image (image.url)}
		<a href={image.url} target="_blank" class="block">
			<img
				src={image.url}
				alt={image.file.name}
				class="aspect-square h-full w-full rounded object-cover"
			/>
		</a>
	{/each}
</div>
