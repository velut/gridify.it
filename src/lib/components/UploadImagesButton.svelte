<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import { getImageFiles } from '$lib/utils/get-image-files';
	import MaterialSymbolsImageArrowUpRounded from '~icons/material-symbols/image-arrow-up-rounded';

	const { render } = getAppState();
	let fileInput: HTMLInputElement;

	async function handleChangeOrDrop(event: Event) {
		event.preventDefault();
		const files = await getImageFiles(event);
		await render.loadImages(files);
		fileInput.value = '';
	}
</script>

<svelte:window
	ondragover={(event) => {
		// Cancel the `dragover` event to let the `drop` event fire later.
		event.preventDefault();
	}}
	ondrop={handleChangeOrDrop}
/>

<button
	type="button"
	class="btn"
	onclick={() => {
		fileInput.click();
	}}
>
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
