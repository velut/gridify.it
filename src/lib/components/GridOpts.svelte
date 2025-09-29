<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import InputWithUnit from '$lib/components/InputWithUnit.svelte';
	import MaterialSymbolsBackToTabRounded from '~icons/material-symbols/back-to-tab-rounded';
	import MaterialSymbolsColorsRounded from '~icons/material-symbols/colors-rounded';
	import MaterialSymbolsCropRounded from '~icons/material-symbols/crop-rounded';
	import MaterialSymbolsExpandRounded from '~icons/material-symbols/expand-rounded';
	import MaterialSymbolsGrid3x3Rounded from '~icons/material-symbols/grid-3x3-rounded';
	import MaterialSymbolsLineWeightRounded from '~icons/material-symbols/line-weight-rounded';
	import MaterialSymbolsRoundedCornerRounded from '~icons/material-symbols/rounded-corner-rounded';
	import FormField from '$lib/components/FormField.svelte';
	import OptsCard from '$lib/components/OptsCard.svelte';

	const { render } = getAppState();
	let grid = $derived(render.opts.opts.grid);
</script>

<OptsCard title="Grid options">
	<FormField>
		<label for="grid-type">
			<MaterialSymbolsGrid3x3Rounded class="size-4" />
			Grid type
		</label>
		<select id="grid-type" class="w-full" bind:value={grid.type}>
			<option value="none">No grid</option>
			<option value="full">Full grid (Border and grid lines)</option>
			<option value="lines">Only grid lines</option>
			<option value="border">Only outer border</option>
			<option value="invisible">Invisible grid</option>
		</select>
	</FormField>

	{#if grid.type !== 'none'}
		<FormField>
			<label for="grid-color">
				<MaterialSymbolsColorsRounded class="size-4" />
				Grid color
			</label>
			<div
				class="dark:bg-input/30 border-input grid place-items-center rounded-md border bg-transparent p-1"
			>
				<input id="grid-color" class="w-full" type="color" bind:value={grid.color} />
			</div>
		</FormField>

		{#if grid.type !== 'invisible'}
			<FormField>
				<label for="grid-lines-size">
					<MaterialSymbolsLineWeightRounded class="size-4" />
					{#if grid.type === 'full'}
						Grid border and lines size
					{:else if grid.type === 'lines'}
						Grid lines size
					{:else if grid.type === 'border'}
						Grid border size
					{/if}
				</label>
				<InputWithUnit unit="px">
					<input
						id="grid-lines-size"
						type="text"
						inputMode="numeric"
						pattern="[0-9]*"
						title="Use 1 or a bigger integer number of pixels"
						bind:value={grid.lines.size}
					/>
				</InputWithUnit>
			</FormField>
		{/if}

		<FormField>
			<label for="grid-cell-shape">
				<MaterialSymbolsCropRounded class="size-4" />
				Grid cell shape
			</label>
			<select id="grid-cell-shape" class="w-full" bind:value={grid.cell.shape}>
				<option value="square">Square (Same width and height)</option>
				<option value="rectangle">Rectangle (Different width and height)</option>
			</select>
		</FormField>

		<FormField>
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
					bind:value={grid.cell.width}
				/>
			</InputWithUnit>
		</FormField>

		<FormField>
			<label for="grid-cell-height">
				<MaterialSymbolsExpandRounded class="size-4" />
				Grid cell height
			</label>
			{#if grid.cell.shape === 'rectangle'}
				<InputWithUnit unit="px">
					<input
						id="grid-cell-height"
						type="text"
						inputMode="numeric"
						pattern="[0-9]*"
						title="Use 1 or a bigger integer number of pixels"
						bind:value={grid.cell.height}
					/>
				</InputWithUnit>
			{:else}
				<InputWithUnit unit="px" disabled>
					<input id="grid-cell-height" type="text" value={grid.cell.width} disabled />
				</InputWithUnit>
			{/if}
		</FormField>

		<FormField>
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
					bind:value={grid.cell.scale}
				/>
			</InputWithUnit>
		</FormField>

		<FormField>
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
					bind:value={grid.cell.cornerRadius}
				/>
			</InputWithUnit>
		</FormField>
	{/if}
</OptsCard>
