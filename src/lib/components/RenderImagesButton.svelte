<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import MaterialSymbolsAnimatedImagesRounded from '~icons/material-symbols/animated-images-rounded';

	let images = getAppStateContext().images;
</script>

<button
	type="submit"
	form="render-options-form"
	class="btn btn-primary w-full"
	disabled={!images.hasInputImages()}
>
	<MaterialSymbolsAnimatedImagesRounded class="size-6" />
	Render images
</button>
