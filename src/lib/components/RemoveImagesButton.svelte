<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import MaterialSymbolsHideImageRounded from '~icons/material-symbols/hide-image-rounded';

	let { images } = getAppStateContext();
</script>

<Button variant="destructive" onclick={() => images.reset()} disabled={!images.hasInputImages()}>
	<MaterialSymbolsHideImageRounded />
	Remove images
</Button>
