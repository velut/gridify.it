<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import GridOpts from '$lib/components/GridOpts.svelte';
	import PaletteOpts from '$lib/components/PaletteOpts.svelte';

	const { renderOpts, images } = getAppState();

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		await images.render(renderOpts.toRenderOpts());
	}
</script>

<form id="render-opts-form" onsubmit={handleSubmit} class="form grid gap-4">
	<PaletteOpts />
	<GridOpts />
</form>
