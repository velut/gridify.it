<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import MaterialSymbolsImageArrowUpRounded from '~icons/material-symbols/image-arrow-up-rounded';

	let { images } = getAppStateContext();
	let fileInput = $state<HTMLInputElement | null>(null);

	async function handleImagesUpload(e: Event) {
		e.preventDefault();
		await images.upload(e);
		if (fileInput) fileInput.value = '';
	}
</script>

<svelte:window ondragover={(e) => e.preventDefault()} ondrop={handleImagesUpload} />

<Button onclick={() => fileInput?.click()}>
	<MaterialSymbolsImageArrowUpRounded />
	Upload images
</Button>

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
