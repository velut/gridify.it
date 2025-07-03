<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import MaterialSymbolsHideImageRounded from '~icons/material-symbols/hide-image-rounded';

	let { images } = getAppStateContext();
</script>

<button
	type="button"
	class="btn-destructive"
	onclick={() => images.reset()}
	disabled={!images.hasInputImages()}
>
	<MaterialSymbolsHideImageRounded class="size-4" />
	Remove images
</button>
