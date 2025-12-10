<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import MaterialSymbolsRedoRounded from '~icons/material-symbols/redo-rounded';

	const { render } = getAppState();
	let button: HTMLButtonElement;
</script>

<svelte:window
	onkeydown={(event) => {
		if (button.disabled) return;

		// Ctrl+Y or ⌘+Shift+Z keyboard shortcut.
		const key = event.key.toLowerCase();
		if ((event.ctrlKey && key === 'y') || (event.metaKey && event.shiftKey && key === 'z')) {
			event.preventDefault();
			button.click();
		}
	}}
/>

<button
	type="button"
	class="btn-secondary grow"
	title="Redo rendering [Ctrl+Y]"
	bind:this={button}
	onclick={async () => {
		await render.redo();
	}}
	disabled={!render.canRedo()}
>
	<MaterialSymbolsRedoRounded class="size-4" />
	Redo
</button>
