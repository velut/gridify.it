<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import MaterialSymbolsPhotoFrameOutlineRounded from '~icons/material-symbols/photo-frame-outline-rounded';

	const {
		render: { opts }
	} = getAppState();
</script>

<button
	type="button"
	class="btn-secondary"
	title="Use hi-res photo preset"
	onclick={() => {
		opts.setPhotoPreset();
	}}
>
	<MaterialSymbolsPhotoFrameOutlineRounded class="size-4" />
	Hi-res photo preset
</button>
