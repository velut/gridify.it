<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import MaterialSymbolsResetImageRounded from '~icons/material-symbols/reset-image-rounded';

	let { images } = getAppStateContext();
</script>

<button
	type="button"
	class="btn btn-error btn-outline w-full"
	onclick={() => images.undoRender()}
	disabled={!images.hasInputImages()}
>
	<MaterialSymbolsResetImageRounded class="size-6" />
	Undo render images
</button>
