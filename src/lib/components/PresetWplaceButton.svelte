<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import MaterialSymbolsGlobeLocationPinRounded from '~icons/material-symbols/globe-location-pin-rounded';

	const {
		render: { opts }
	} = getAppState();
</script>

<button
	type="button"
	class="btn-secondary"
	title="Use Wplace.live preset"
	onclick={() => {
		opts.setWplacePreset();
	}}
>
	<MaterialSymbolsGlobeLocationPinRounded class="size-4" />
	Wplace.live preset
</button>
