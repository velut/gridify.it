<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import { downloadImages } from '$lib/utils/download-images';
	import MaterialSymbolsDownloadRounded from '~icons/material-symbols/download-rounded';

	const { render } = getAppState();
</script>

<button
	type="button"
	class="btn"
	title="Download rendered images"
	onclick={async () => {
		await downloadImages(render.images);
	}}
	disabled={!render.hasImages()}
>
	<MaterialSymbolsDownloadRounded class="size-4" />
	Download images
</button>
