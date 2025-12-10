<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import MaterialSymbolsAnimatedImagesRounded from '~icons/material-symbols/animated-images-rounded';

	const { render } = getAppState();
	let button: HTMLButtonElement;
</script>

<svelte:window
	onkeydown={(event) => {
		if (button.disabled) return;

		// Ctrl+Enter or ⌘+Enter keyboard shortcut.
		if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
			event.preventDefault();
			button.click();
		}
	}}
/>

<button
	type="submit"
	form="render-opts-form"
	class="btn"
	title="Render images [Ctrl+Enter]"
	bind:this={button}
	disabled={!render.canRender()}
>
	<MaterialSymbolsAnimatedImagesRounded class="size-4" />
	Render images
</button>
