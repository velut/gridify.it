<script lang="ts">
	import { dev } from '$app/environment';
	import { handleRenderImagesHotkey } from '$lib/handle-render-images-hotkey';
	import { inputImages, inputImagesState } from '$lib/stores';

	$: ({ isLoaded } = $inputImagesState);
	$: images = $inputImages;
	$: disabled = dev ? false : !isLoaded || images.length === 0;
</script>

<button
	use:handleRenderImagesHotkey
	title="Click to render all images (Hotkey: Ctrl+Enter)"
	type="submit"
	class="btn btn-outline w-full"
	{disabled}>Render Images</button
>
