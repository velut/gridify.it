<script lang="ts">
	import { getAppStateContext } from '$lib/state/app-state.svelte';
	import InputWithUnit from '$lib/components/InputWithUnit.svelte';
	import MaterialSymbolsBackToTabRounded from '~icons/material-symbols/back-to-tab-rounded';
	import MaterialSymbolsColorsRounded from '~icons/material-symbols/colors-rounded';
	import MaterialSymbolsCropRounded from '~icons/material-symbols/crop-rounded';
	import MaterialSymbolsExpandRounded from '~icons/material-symbols/expand-rounded';
	import MaterialSymbolsGrid3x3Rounded from '~icons/material-symbols/grid-3x3-rounded';
	import MaterialSymbolsLineWeightRounded from '~icons/material-symbols/line-weight-rounded';
	import MaterialSymbolsRoundedCornerRounded from '~icons/material-symbols/rounded-corner-rounded';
	import MaterialSymbolsTextureRounded from '~icons/material-symbols/texture-rounded';

	const { renderOpts, images } = getAppStateContext();
	const { opts } = renderOpts;
	let isGridTypeNone = $derived(opts.grid.type === 'none');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		await images.render(renderOpts.toRenderOpts());
	}
</script>

<form id="render-options-form" onsubmit={handleSubmit} class="form grid gap-6">
	<div class="grid gap-2">
		<label for="grid-type">
			<MaterialSymbolsGrid3x3Rounded class="size-4" />
			Grid type
		</label>
		<select id="grid-type" class="w-full" bind:value={opts.grid.type}>
			<option value="full">Full grid (Grid lines and outer border)</option>
			<option value="lines">Grid lines only</option>
			<option value="border">Outer border only</option>
			<option value="none">None</option>
		</select>
	</div>

	<div class="grid gap-2">
		<label for="grid-color">
			<MaterialSymbolsColorsRounded class="size-4" />
			Grid color
		</label>
		<div
			class="dark:bg-input/30 border-input grid place-items-center rounded-md border bg-transparent p-1"
		>
			<input id="grid-color" class="w-full" type="color" bind:value={opts.grid.color} />
		</div>
	</div>

	<div class="grid gap-2">
		<label for="grid-lines-size">
			<MaterialSymbolsLineWeightRounded class="size-4" />
			Grid lines size
		</label>
		<InputWithUnit unit="px">
			<input
				id="grid-lines-size"
				type="text"
				inputMode="numeric"
				pattern="[0-9]*"
				title="Use 1 or a bigger integer number of pixels"
				bind:value={opts.grid.lines.size}
				disabled={isGridTypeNone}
			/>
		</InputWithUnit>
	</div>

	<div class="grid gap-2">
		<label for="grid-cell-shape">
			<MaterialSymbolsCropRounded class="size-4" />
			Grid cell shape
		</label>
		<select id="grid-cell-shape" class="w-full" bind:value={opts.grid.cell.shape}>
			<option value="square">Square (Same width and height)</option>
			<option value="rectangle">Rectangle (Different width and height)</option>
		</select>
	</div>

	<div class="grid gap-2">
		<label for="grid-cell-width">
			<MaterialSymbolsExpandRounded class="size-4 rotate-90" />
			Grid cell width
		</label>
		<InputWithUnit unit="px">
			<input
				id="grid-cell-width"
				type="text"
				inputMode="numeric"
				pattern="[0-9]*"
				title="Use 1 or a bigger integer number of pixels"
				bind:value={opts.grid.cell.width}
			/>
		</InputWithUnit>
	</div>

	<div class="grid gap-2">
		<label for="grid-cell-height">
			<MaterialSymbolsExpandRounded class="size-4" />
			Grid cell height
		</label>
		{#if opts.grid.cell.shape === 'rectangle'}
			<InputWithUnit unit="px">
				<input
					id="grid-cell-height"
					type="text"
					inputMode="numeric"
					pattern="[0-9]*"
					title="Use 1 or a bigger integer number of pixels"
					bind:value={opts.grid.cell.height}
				/>
			</InputWithUnit>
		{:else}
			<InputWithUnit unit="px" disabled>
				<input id="grid-cell-height" type="text" value={opts.grid.cell.width} disabled />
			</InputWithUnit>
		{/if}
	</div>

	<div class="grid gap-2">
		<label for="grid-cell-scale">
			<MaterialSymbolsBackToTabRounded class="size-4 -scale-x-100" />
			Grid cell scale
		</label>
		<InputWithUnit unit="x">
			<input
				id="grid-cell-scale"
				type="text"
				inputMode="numeric"
				pattern="[0-9]*"
				title="Use 1 or a bigger integer number for scaling"
				bind:value={opts.grid.cell.scale}
			/>
		</InputWithUnit>
	</div>

	<div class="grid gap-2">
		<label for="grid-cell-corner-radius">
			<MaterialSymbolsRoundedCornerRounded class="size-4" />
			Grid cell corner radius
		</label>
		<InputWithUnit unit="px">
			<input
				id="grid-cell-corner-radius"
				type="text"
				inputMode="numeric"
				pattern="[0-9]*"
				title="Use 0 or a bigger integer number of pixels"
				bind:value={opts.grid.cell.cornerRadius}
			/>
		</InputWithUnit>
	</div>

	<!--
	<div class="grid gap-2">
		<label for="opacity">
			<MaterialSymbolsTextureRounded class="size-4" />
			Transparent pixels
		</label>
		<select id="opacity" class="w-full" bind:value={opts.opacity}>
			<option value="preserve">Preserve transparency</option>
			<option value="opaque">Make fully opaque</option>
		</select>
	</div>
	-->
</form>
