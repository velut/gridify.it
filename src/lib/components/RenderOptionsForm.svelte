<script lang="ts">
	import CellRadiusInput from '$lib/components/CellRadiusInput.svelte';
	import CellScaleInput from '$lib/components/CellScaleInput.svelte';
	import CellSizeInput from '$lib/components/CellSizeInput.svelte';
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

	const { form, isDirty, reset } = createForm({
		initialValues: {
			grid: { type: 'none', stroke: { size: '1', color: '#000000' } },
			cell: { size: '1', scale: '1', radius: '0' },
			pixel: { fullyOpaque: false }
		},
		onSubmit: (values) => {
			$renderOptions = renderOptionsSchema.parse(values);
		},
		extend: [validator({ schema: renderOptionsSchema }), reporter()]
	});
</script>

<form use:form>
	<GridTypeInput />
	<GridStrokeSizeInput />
	<GridStrokeColorInput />

	<CellSizeInput />
	<CellScaleInput />
	<CellRadiusInput />

	<PixelFullyOpaqueInput />

	<div class="space-y-4">
		<ResetRenderOptionsButton isDirty={$isDirty} {reset} />
		<RenderImagesButton />
	</div>
</form>
