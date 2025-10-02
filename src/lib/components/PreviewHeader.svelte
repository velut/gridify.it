<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import prettyBytes from 'pretty-bytes';

	// TODO: sync state with image display
	const { render, preview } = getAppState();
	let images = $derived(render.images);
	let index = $state(0);
	let image = $derived(images[index]);
	let id = $derived(images[index].id);
</script>

<div class="flex flex-col gap-4 xl:flex-row">
	<div>
		<label for="preview-image-id" class="sr-only">Select an image to display</label>
		<select id="preview-image-id" class="select w-full" bind:value={id}>
			{#each images as image (image.id)}
				<option value={image.id}>{image.originalFile.name}</option>
			{/each}
		</select>
	</div>

	<div class="bg-border hidden h-9 w-[1px] xl:block"></div>
	<div class="flex flex-col gap-4 sm:flex-row">
		<div>
			<label for="preview-mode" class="sr-only"> Select preview mode </label>
			<select id="preview-mode" class="select w-full" bind:value={preview.mode}>
				<option value="pixel-art">Show as pixel art</option>
				<option value="hi-res">Show as hi-res image</option>
			</select>
		</div>

		<div class="bg-border hidden h-9 w-[1px] sm:block"></div>
		<div class="flex items-center gap-4">
			<span class="btn-outline pointer-events-none">{image.width}x{image.height}</span>

			<div class="bg-border h-9 w-[1px]"></div>
			<span class="btn-outline pointer-events-none">{prettyBytes(image.file.size)}</span>
		</div>
	</div>
</div>
