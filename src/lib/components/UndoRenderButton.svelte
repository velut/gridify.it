<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import MaterialSymbolsUndoRounded from '~icons/material-symbols/undo-rounded';

	const { render } = getAppState();
	let button: HTMLButtonElement;
</script>

<svelte:window
	onkeydown={(event) => {
		if (button.disabled) return;

		// Ctrl+Z or ⌘+Z keyboard shortcut.
		const key = event.key.toLowerCase();
		if ((event.ctrlKey || event.metaKey) && key === 'z') {
			event.preventDefault();
			button.click();
		}
	}}
/>

<button
	type="button"
	class="btn-secondary grow"
	title="Undo rendering [Ctrl+Z]"
	bind:this={button}
	onclick={async () => {
		await render.undo();
	}}
	disabled={!render.canUndo()}
>
	<MaterialSymbolsUndoRounded class="size-4" />
	Undo
</button>
