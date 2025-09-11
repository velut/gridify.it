<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import { downloadFiles } from '$lib/utils/download-files';
	import MaterialSymbolsDownloadRounded from '~icons/material-symbols/download-rounded';

	const { images } = getAppState();

	async function downloadImages() {
		await downloadFiles(
			// TODO:
			images.outputImages.map(({ file }) => file),
			'gridify-it-images.zip'
		);
	}
</script>

<button type="button" class="btn" onclick={downloadImages} disabled={!images.hasOutputImages()}>
	<MaterialSymbolsDownloadRounded class="size-4" />
	Download images
</button>
