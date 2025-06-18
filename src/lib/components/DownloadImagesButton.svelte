<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import MaterialSymbolsDownloadRounded from '~icons/material-symbols/download-rounded';

	let { images } = getAppStateContext();
</script>

<Button onclick={() => images.download()} disabled={!images.hasOutputImages()}>
	<MaterialSymbolsDownloadRounded />
	Download images
</Button>
