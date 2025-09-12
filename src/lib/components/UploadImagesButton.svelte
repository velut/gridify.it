<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import { getImages } from '$lib/utils/get-images';
	import MaterialSymbolsImageArrowUpRounded from '~icons/material-symbols/image-arrow-up-rounded';

	const { render } = getAppState();
	let fileInput: HTMLInputElement;

	function handleDragOver(event: DragEvent) {
		// Cancel the `dragover` event to let the `drop` event fire later.
		event.preventDefault();
	}

	async function handleChangeOrDrop(event: Event) {
		event.preventDefault();
		render.load(await getImages(event));
		resetFileInput();
	}

	function clickFileInput() {
		fileInput.click();
	}

	function resetFileInput() {
		fileInput.value = '';
	}
</script>

<svelte:window ondragover={handleDragOver} ondrop={handleChangeOrDrop} />

<button type="button" class="btn" onclick={clickFileInput}>
	<MaterialSymbolsImageArrowUpRounded class="size-4" />
	Upload images
</button>

<!-- Hidden file input -->
<label for="file-input" class="sr-only">Click to open a file dialog</label>
<input
	id="file-input"
	type="file"
	multiple
	accept="image/*"
	class="sr-only"
	onchange={handleChangeOrDrop}
	bind:this={fileInput}
/>
