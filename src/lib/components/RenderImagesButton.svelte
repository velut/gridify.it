<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import MaterialSymbolsAnimatedImagesRounded from '~icons/material-symbols/animated-images-rounded';

	let { images } = getAppStateContext();
	let button: HTMLButtonElement;

	function handleHotkey(e: KeyboardEvent) {
		if (e.ctrlKey && e.key === 'Enter' && !button.disabled) {
			e.preventDefault();
			button.click();
		}
	}
</script>

<svelte:window onkeydown={handleHotkey} />

<button
	type="submit"
	form="render-options-form"
	class="btn btn-primary w-full"
	disabled={!images.hasInputImages()}
	bind:this={button}
	title="Render images [Ctrl+Enter]"
>
	<MaterialSymbolsAnimatedImagesRounded class="size-6" />
	Render images
</button>
