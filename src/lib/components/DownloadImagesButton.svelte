<script lang="ts">
	import { getAppStateContext } from '$lib/state/app-state.svelte';
	import MaterialSymbolsDownloadRounded from '~icons/material-symbols/download-rounded';

	const { images } = getAppStateContext();
</script>

<button
	type="button"
	class="btn"
	onclick={() => images.download()}
	disabled={!images.hasOutputImages()}
>
	<MaterialSymbolsDownloadRounded class="size-4" />
	Download images
</button>
