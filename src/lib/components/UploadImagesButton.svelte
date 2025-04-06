<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import MaterialSymbolsImageArrowUpRounded from '~icons/material-symbols/image-arrow-up-rounded';

	let images = getAppStateContext().images;
	let fileInput: HTMLInputElement;

	function clickFileInput() {
		fileInput.click();
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
	}

	async function handleImagesUpload(event: Event) {
		event.preventDefault();
		await images.upload(event);
		fileInput.value = '';
	}
</script>

<svelte:window ondragover={handleDragOver} ondrop={handleImagesUpload} />

<button type="button" class="btn btn-primary w-full" onclick={clickFileInput}>
	<MaterialSymbolsImageArrowUpRounded class="size-6" />
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
	onchange={handleImagesUpload}
	bind:this={fileInput}
/>
