<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import MaterialSymbolsDownloadRounded from '~icons/material-symbols/download-rounded';

	let images = getAppStateContext().images;

	function onDownloadImages() {
		console.log('onDownloadImages');
	}
</script>

<button
	type="button"
	class="btn btn-primary w-full"
	onclick={onDownloadImages}
	disabled={!images.hasInputImages()}
>
	<MaterialSymbolsDownloadRounded class="size-6" />
	Download images
</button>
