<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import MaterialSymbolsResetImageRounded from '~icons/material-symbols/reset-image-rounded';

	let { images } = getAppStateContext();
	let button = $state<HTMLInputElement | null>(null);

	function handleHotkey(e: KeyboardEvent) {
		if (e.ctrlKey && e.key.toLowerCase() === 'z' && button && !button.disabled) {
			e.preventDefault();
			button.click();
		}
	}
</script>

<svelte:window onkeydown={handleHotkey} />

<Button
	title="Undo render images [Ctrl+Z]"
	onclick={() => images.undoRender()}
	disabled={!images.hasInputImages() || !images.hasRenderedImages()}
	bind:ref={button}
>
	<MaterialSymbolsResetImageRounded />
	Undo render images
</Button>
