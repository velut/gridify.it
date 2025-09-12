<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import MaterialSymbolsHideImageRounded from '~icons/material-symbols/hide-image-rounded';

	const { render } = getAppState();

	function resetImages() {
		render.resetImages();
	}
</script>

<button type="button" class="btn-secondary" onclick={resetImages} disabled={!render.hasImages()}>
	<MaterialSymbolsHideImageRounded class="size-4" />
	Remove images
</button>
