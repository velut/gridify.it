<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import MaterialSymbolsResetImageRounded from '~icons/material-symbols/reset-image-rounded';

	let { images } = getAppStateContext();
	let button: HTMLButtonElement;

	function handleHotkey(e: KeyboardEvent) {
		if (e.ctrlKey && e.key.toLowerCase() === 'z' && !button.disabled) {
			e.preventDefault();
			button.click();
		}
	}
</script>

<svelte:window onkeydown={handleHotkey} />

<button
	type="button"
	class="btn-secondary"
	onclick={() => images.undoRender()}
	disabled={!images.hasInputImages() || !images.hasRenderedImages()}
	bind:this={button}
	title="Undo render images [Ctrl+Z]"
>
	<MaterialSymbolsResetImageRounded class="size-4" />
	Undo render images
</button>
