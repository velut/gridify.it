<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import MaterialSymbolsGalleryThumbnailRounded from '~icons/material-symbols/gallery-thumbnail-rounded';

	const { preview } = getAppState();
</script>

<div class="grid gap-2">
	<label for="preview-mode" class="label">
		<MaterialSymbolsGalleryThumbnailRounded class="size-4" />
		Preview mode
	</label>
	<select id="preview-mode" class="select w-full sm:w-fit" bind:value={preview.mode}>
		<option value="pixel-art">Pixel art</option>
		<option value="high-res">High resolution images</option>
	</select>
	<p class="text-muted-foreground text-sm">
		Previews may contain visual artifacts, click on an image to see it at full size
	</p>
</div>
