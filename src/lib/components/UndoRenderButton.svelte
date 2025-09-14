<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import MaterialSymbolsUndoRounded from '~icons/material-symbols/undo-rounded';

	const { render } = getAppState();
	let button: HTMLButtonElement;
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.ctrlKey && event.key.toLowerCase() === 'z' && !button.disabled) {
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
	onclick={() => {
		render.undo();
	}}
	disabled={!render.canUndo()}
>
	<MaterialSymbolsUndoRounded class="size-4" />
	Undo
</button>
