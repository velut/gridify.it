<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import MaterialSymbolsHideImageRounded from '~icons/material-symbols/hide-image-rounded';

	const { render } = getAppState();
</script>

<button
	type="button"
	class="btn-secondary"
	title="Remove uploaded images"
	onclick={async () => {
		await render.resetImages();
	}}
	disabled={!render.canResetImages()}
>
	<MaterialSymbolsHideImageRounded class="size-4" />
	Remove images
</button>
