<script lang="ts">
	import CellHeightInput from '$lib/components/CellHeightInput.svelte';
	import CellRadiusInput from '$lib/components/CellRadiusInput.svelte';
	import CellScaleInput from '$lib/components/CellScaleInput.svelte';
	import CellSquareAspectRatioInput from '$lib/components/CellSquareAspectRatioInput.svelte';
	import CellWidthInput from '$lib/components/CellWidthInput.svelte';
	import GridStrokeColorInput from '$lib/components/GridStrokeColorInput.svelte';
	import GridStrokeSizeInput from '$lib/components/GridStrokeSizeInput.svelte';
	import GridTypeInput from '$lib/components/GridTypeInput.svelte';
	import PixelFullyOpaqueInput from '$lib/components/PixelFullyOpaqueInput.svelte';
	import RenderImagesButton from '$lib/components/RenderImagesButton.svelte';
	import ResetRenderOptionsButton from '$lib/components/ResetRenderOptionsButton.svelte';
	import { renderOptionsSchema } from '$lib/render-options';
	import { renderOptions } from '$lib/stores';
	import reporter from '@felte/reporter-tippy';
	import { validator } from '@felte/validator-zod';
	import { createForm } from 'felte';

	const { form, data, isDirty, reset, resetField } = createForm({
		initialValues: {
			grid: { type: 'none', stroke: { size: '1', color: '#000000' } },
			cell: { squareAspectRatio: true, width: '1', height: '1', scale: '1', radius: '0' },
			pixel: { fullyOpaque: false }
		},
		onSubmit: (values) => {
			$renderOptions = renderOptionsSchema.parse(values);
		},
		extend: [validator({ schema: renderOptionsSchema }), reporter()]
	});

	$: gridDisabled = $data.grid.type === 'none';
	$: cellSquareAspectRatio = $data.cell.squareAspectRatio;
	$: if (cellSquareAspectRatio) {
		resetField('cell.height');
	}
</script>

<form use:form>
	<ResetRenderOptionsButton isDirty={$isDirty} {reset} />

	<div class="divider" />

	<div class="space-y-2">
		<GridTypeInput />
		<GridStrokeSizeInput disabled={gridDisabled} />
		<GridStrokeColorInput />
	</div>

	<div class="divider" />

	<div class="space-y-2">
		<CellSquareAspectRatioInput />
		<CellWidthInput />
		<CellHeightInput disabled={cellSquareAspectRatio} />
		<CellScaleInput />
		<CellRadiusInput />
	</div>

	<div class="divider" />

	<PixelFullyOpaqueInput />

	<div class="divider" />

	<RenderImagesButton />
</form>
