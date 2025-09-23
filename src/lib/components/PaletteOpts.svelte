<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import MaterialSymbolsTextSnippetOutlineRounded from '~icons/material-symbols/text-snippet-outline-rounded';
	import MaterialSymbolsPaletteOutline from '~icons/material-symbols/palette-outline';
	import MaterialSymbolsBackgroundDotSmallOutline from '~icons/material-symbols/background-dot-small-outline';
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
			<option value="grayscale">Grayscale</option>
			<option value="binary">Black and white</option>
			<option value="rgb">RGB (Red, Green, Blue)</option>
			<option value="cmyk">CMYK (Cyan, Magenta, Yellow, Black)</option>
			<option value="pico-8">PICO-8</option>
			<option value="wplace-free">Wplace free colors</option>
			<option value="wplace-full">Wplace all colors</option>
			<option value="custom">Custom palette</option>
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
				required
				title="Use an integer number between 0 and 255 for the threshold"
				bind:value={palette.binary.threshold}
			/>
		</FormField>
	{/if}

	{#if palette.type === 'custom'}
		<FormField>
			<label for="palette-custom-palette">
				<MaterialSymbolsTextSnippetOutlineRounded class="size-4" />
				Palette colors [One hex color per line]
			</label>
			<textarea
				id="palette-custom-palette"
				spellcheck="false"
				required
				bind:value={palette.custom.palette}
			></textarea>
		</FormField>
	{/if}

	{#if !['original', 'opaque', 'invert', 'grayscale'].includes(palette.type)}
		<FormField>
			<label for="palette-dither-type">
				<MaterialSymbolsBackgroundDotSmallOutline class="size-4" />
				Dithering
			</label>
			<select id="palette-dither-type" class="w-full" bind:value={palette.dither.type}>
				<option value="none">No dithering</option>
				<option value="atkinson">Atkinson (Better contrast)</option>
				<option value="floyd">Floyd–Steinberg (More details)</option>
			</select>
		</FormField>
	{/if}
</OptsCard>
