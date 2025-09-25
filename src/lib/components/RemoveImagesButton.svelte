<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import MaterialSymbolsHideImageRounded from '~icons/material-symbols/hide-image-rounded';

	const { render } = getAppState();
</script>

<button
	type="button"
	class="btn-secondary"
	onclick={() => {
		render.resetImages();
	}}
	disabled={!render.canResetImages()}
>
	<MaterialSymbolsHideImageRounded class="size-4" />
	Remove images
</button>
