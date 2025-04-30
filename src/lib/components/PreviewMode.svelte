<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import MaterialSymbolsGalleryThumbnailRounded from '~icons/material-symbols/gallery-thumbnail-rounded';

	let { preview } = getAppStateContext();
</script>

<fieldset class="fieldset text-sm">
	<legend class="fieldset-legend">
		<MaterialSymbolsGalleryThumbnailRounded class="size-6" />
		Preview mode
	</legend>
	<select class="select" bind:value={preview.mode}>
		<option value="pixel-art">Pixel art</option>
		<option value="high-res">High resolution images</option>
	</select>
	<span class="label whitespace-normal"
		>Previews may contain visual artifacts, click on an image to see it at full size</span
	>
</fieldset>
