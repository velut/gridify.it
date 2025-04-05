<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import MaterialSymbolsResetImageRounded from '~icons/material-symbols/reset-image-rounded';

	let images = getAppStateContext().images;

	function resetImages() {
		images.reset();
	}
</script>

<button class="btn btn-error btn-outline w-full" onclick={resetImages}>
	<MaterialSymbolsResetImageRounded class="size-6" />
	Remove images
</button>
