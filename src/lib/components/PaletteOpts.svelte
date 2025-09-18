<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import MaterialSymbolsPaletteOutline from '~icons/material-symbols/palette-outline';
	import MaterialSymbolsElevationOutlineRounded from '~icons/material-symbols/elevation-outline-rounded';
	import FormField from '$lib/components/FormField.svelte';
	import OptsCard from '$lib/components/OptsCard.svelte';

	const { render } = getAppState();
	let palette = $derived(render.opts.palette);
</script>

<OptsCard title="Palette options">
	<FormField>
		<label for="palette-type">
			<MaterialSymbolsPaletteOutline class="size-4" />
			Palette
		</label>
		<select id="palette-type" class="w-full" bind:value={palette.type}>
			<option value="original">Original colors</option>
			<option value="opaque">Original colors with full opacity</option>
			<option value="invert">Invert colors</option>
			<option value="binary">Black and white</option>
			<option value="grayscale">Grayscale</option>
		</select>
	</FormField>

	{#if palette.type === 'binary'}
		<FormField>
			<label for="palette-binary-threshold">
				<MaterialSymbolsElevationOutlineRounded class="size-4" />
				Threshold [0->255]
			</label>
			<input
				id="palette-binary-threshold"
				type="text"
				inputMode="numeric"
				pattern="[0-9]*"
				title="Use an integer number between 0 and 255 for the threshold"
				bind:value={palette.binary.threshold}
			/>
		</FormField>
	{/if}
</OptsCard>
