<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import GridOpts from '$lib/components/GridOpts.svelte';
	import PaletteOpts from '$lib/components/PaletteOpts.svelte';
	import ScaleOpts from '$lib/components/ScaleOpts.svelte';

	const { render } = getAppState();
</script>

<form
	id="render-opts-form"
	class="form grid gap-4"
	onsubmit={async (event) => {
		event.preventDefault();
		await render.render();
	}}
>
	<ScaleOpts />
	<PaletteOpts />
	<GridOpts />
</form>
