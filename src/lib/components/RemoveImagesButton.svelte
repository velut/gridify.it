<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import MaterialSymbolsHideImageRounded from '~icons/material-symbols/hide-image-rounded';

	const { images } = getAppState();
</script>

<button
	type="button"
	class="btn-secondary"
	onclick={() => images.reset()}
	disabled={!images.hasInputImages()}
>
	<MaterialSymbolsHideImageRounded class="size-4" />
	Remove images
</button>
