<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import MaterialSymbolsImageArrowUpRounded from '~icons/material-symbols/image-arrow-up-rounded';

	const { images } = getAppState();
	let fileInput: HTMLInputElement;

	async function handleImagesUpload(e: Event) {
		e.preventDefault();
		await images.upload(e);
		fileInput.value = '';
	}
</script>

<svelte:window ondragover={(e) => e.preventDefault()} ondrop={handleImagesUpload} />

<button type="button" class="btn" onclick={() => fileInput.click()}>
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
	onchange={handleImagesUpload}
	bind:this={fileInput}
/>
