<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import MaterialSymbolsDownloadRounded from '~icons/material-symbols/download-rounded';

	let { images } = getAppStateContext();
</script>

<button
	type="button"
	class="btn btn-primary w-full"
	onclick={() => images.download()}
	disabled={!images.hasOutputImages()}
>
	<MaterialSymbolsDownloadRounded class="size-6" />
	Download images
</button>
