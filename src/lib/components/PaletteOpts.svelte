<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import MaterialSymbolsPaletteOutline from '~icons/material-symbols/palette-outline';
	import FormField from '$lib/components/FormField.svelte';
	import OptsCard from '$lib/components/OptsCard.svelte';

	const { render } = getAppState();
	let opts = $derived(render.opts);
</script>

<OptsCard title="Palette options">
	<FormField>
		<label for="palette-type">
			<MaterialSymbolsPaletteOutline class="size-4" />
			Palette
		</label>
		<select id="palette-type" class="w-full" bind:value={opts.palette.type}>
			<option value="original">Original colors</option>
			<option value="opaque">Original colors with full opacity</option>
			<option value="binary">Black and white</option>
			<option value="grayscale">Grayscale</option>
		</select>
	</FormField>
</OptsCard>
