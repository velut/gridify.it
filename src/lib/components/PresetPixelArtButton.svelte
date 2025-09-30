<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import MaterialSymbolsGamepadRounded from '~icons/material-symbols/gamepad-rounded';

	const {
		render: { opts }
	} = getAppState();
</script>

<button
	type="button"
	class="btn-secondary"
	title="Use pixel art preset"
	onclick={() => {
		opts.setPixelArtPreset();
	}}
>
	<MaterialSymbolsGamepadRounded class="size-4" />
	Pixel art preset
</button>
