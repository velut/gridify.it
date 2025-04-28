<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import MaterialSymbolsBackToTabRounded from '~icons/material-symbols/back-to-tab-rounded';
	import MaterialSymbolsColorsRounded from '~icons/material-symbols/colors-rounded';
	import MaterialSymbolsCropRounded from '~icons/material-symbols/crop-rounded';
	import MaterialSymbolsExpandRounded from '~icons/material-symbols/expand-rounded';
	import MaterialSymbolsGrid3x3Rounded from '~icons/material-symbols/grid-3x3-rounded';
	import MaterialSymbolsLineWeightRounded from '~icons/material-symbols/line-weight-rounded';
	import MaterialSymbolsRoundedCornerRounded from '~icons/material-symbols/rounded-corner-rounded';
	import MaterialSymbolsTextureRounded from '~icons/material-symbols/texture-rounded';

	let { renderOptions: opts, images } = getAppStateContext();

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		await images.render(opts.toRenderOptions());
	}
</script>

<form id="render-options-form" onsubmit={handleSubmit}>
	<fieldset class="fieldset text-sm">
		<legend class="fieldset-legend pt-0">
			<MaterialSymbolsGrid3x3Rounded class="size-6" />
			Grid type
		</legend>
		<select class="select w-full" bind:value={opts.grid.type}>
			<option value="full">Full grid (Grid lines and outer border)</option>
			<option value="lines">Grid lines only</option>
			<option value="border">Outer border only</option>
			<option value="none">None</option>
		</select>
	</fieldset>

	<fieldset class="fieldset text-sm">
		<legend class="fieldset-legend">
			<MaterialSymbolsColorsRounded class="size-6" />
			Grid color
		</legend>
		<label class="input w-full">
			<input type="color" bind:value={opts.grid.color} />
		</label>
	</fieldset>

	<fieldset class="fieldset text-sm">
		<legend class="fieldset-legend">
			<MaterialSymbolsLineWeightRounded class="size-6" />
			Grid lines size
		</legend>
		<label class="input w-full">
			<input
				type="text"
				inputMode="numeric"
				pattern="[0-9]*"
				title="Use 1 or a bigger integer number of pixels"
				bind:value={opts.grid.lines.size}
				disabled={opts.isGridTypeNone()}
			/>
			<span class="label">px</span>
		</label>
	</fieldset>

	<fieldset class="fieldset text-sm">
		<legend class="fieldset-legend">
			<MaterialSymbolsCropRounded class="size-6" />
			Grid cell shape
		</legend>
		<select class="select w-full" bind:value={opts.grid.cell.shape}>
			<option value="square">Square (Same width and height)</option>
			<option value="rectangle">Rectangle (Different width and height)</option>
		</select>
	</fieldset>

	<fieldset class="fieldset text-sm">
		<legend class="fieldset-legend">
			<MaterialSymbolsExpandRounded class="size-6 rotate-90" />
			Grid cell width
		</legend>
		<label class="input w-full">
			<input
				type="text"
				inputMode="numeric"
				pattern="[0-9]*"
				title="Use 1 or a bigger integer number of pixels"
				bind:value={opts.grid.cell.width}
			/>
			<span class="label">px</span>
		</label>
	</fieldset>

	<fieldset class="fieldset text-sm">
		<legend class="fieldset-legend">
			<MaterialSymbolsExpandRounded class="size-6" />
			Grid cell height
		</legend>
		<label class="input w-full">
			{#if opts.grid.cell.shape === 'rectangle'}
				<input
					type="text"
					inputMode="numeric"
					pattern="[0-9]*"
					title="Use 1 or a bigger integer number of pixels"
					bind:value={opts.grid.cell.height}
				/>
			{:else}
				<input type="text" value={opts.grid.cell.width} disabled />
			{/if}
			<span class="label">px</span>
		</label>
	</fieldset>

	<fieldset class="fieldset text-sm">
		<legend class="fieldset-legend">
			<MaterialSymbolsBackToTabRounded class="size-6 -scale-x-100" />
			Grid cell scale
		</legend>
		<label class="input w-full">
			<input
				type="text"
				inputMode="numeric"
				pattern="[0-9]*"
				title="Use 1 or a bigger integer number of pixels"
				bind:value={opts.grid.cell.scale}
			/>
			<span class="label">x</span>
		</label>
	</fieldset>

	<fieldset class="fieldset text-sm">
		<legend class="fieldset-legend">
			<MaterialSymbolsRoundedCornerRounded class="size-6" />
			Grid cell corner radius
		</legend>
		<label class="input w-full">
			<input
				type="text"
				inputMode="numeric"
				pattern="[0-9]*"
				title="Use 0 or a bigger integer number of pixels"
				bind:value={opts.grid.cell.cornerRadius}
			/>
			<span class="label">px</span>
		</label>
	</fieldset>

	<fieldset class="fieldset text-sm">
		<legend class="fieldset-legend">
			<MaterialSymbolsTextureRounded class="size-6" />
			Transparent pixels
		</legend>
		<select class="select w-full" bind:value={opts.opacity}>
			<option value="preserve">Preserve transparency</option>
			<option value="opaque">Make fully opaque</option>
		</select>
	</fieldset>
</form>
