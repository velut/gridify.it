<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import MaterialSymbolsAnimatedImagesRounded from '~icons/material-symbols/animated-images-rounded';

	let { images } = getAppStateContext();
	let button = $state<HTMLInputElement | null>(null);

	function handleHotkey(e: KeyboardEvent) {
		if (e.ctrlKey && e.key === 'Enter' && button && !button.disabled) {
			e.preventDefault();
			button.click();
		}
	}
</script>

<svelte:window onkeydown={handleHotkey} />

<Button
	type="submit"
	form="render-options-form"
	title="Render images [Ctrl+Enter]"
	disabled={!images.hasInputImages()}
	bind:ref={button}
>
	<MaterialSymbolsAnimatedImagesRounded />
	Render images
</Button>
