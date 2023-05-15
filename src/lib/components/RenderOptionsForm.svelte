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
	import { renderOptions, renderOptionsSuperForm } from '$lib/stores';
	import type { Writable } from 'svelte/store';
	import { intProxy, superForm } from 'sveltekit-superforms/client';

	const {
		form,
		errors, // TODO: use errors
		tainted,
		reset: resetForm,
		enhance
	} = superForm($renderOptionsSuperForm, {
		SPA: true,
		dataType: 'json',
		validators: renderOptionsSchema,
		taintedMessage: null,
		onUpdate({ form }) {
			if (form.valid) {
				$renderOptions = renderOptionsSchema.parse(form.data);
			}
		}
	});

	const gridStrokeSizeIntProxy = intProxy(form, ['grid', 'stroke', 'size']) as Writable<string>;
	const cellWidthIntProxy = intProxy(form, ['cell', 'width']) as Writable<string>;
	const cellHeightIntProxy = intProxy(form, ['cell', 'height']) as Writable<string>;
	const cellScaleIntProxy = intProxy(form, ['cell', 'scale']) as Writable<string>;
	const cellRadiusIntProxy = intProxy(form, ['cell', 'radius']) as Writable<string>;

	$: isFormTainted = Boolean($tainted);
	$: isGridDisabled = $form.grid.type === 'none';
	$: isCellSquareAspectRatio = $form.cell.squareAspectRatio;
	$: if (isGridDisabled) {
		$gridStrokeSizeIntProxy = 'reset-trigger';
		$gridStrokeSizeIntProxy = '1';
	}
	$: if (isCellSquareAspectRatio) {
		$cellHeightIntProxy = 'reset-trigger';
		$cellHeightIntProxy = '1';
	}
</script>

<form method="POST" use:enhance>
	<ResetRenderOptionsButton {isFormTainted} {resetForm} />

	<div class="divider" />

	<div class="space-y-2">
		<GridTypeInput bind:value={$form.grid.type} />
		<GridStrokeSizeInput
			bind:value={$gridStrokeSizeIntProxy}
			errors={$errors.grid?.stroke?.size}
			disabled={isGridDisabled}
		/>
		<GridStrokeColorInput bind:value={$form.grid.stroke.color} />
	</div>

	<div class="divider" />

	<div class="space-y-2">
		<CellSquareAspectRatioInput bind:checked={$form.cell.squareAspectRatio} />
		<CellWidthInput bind:value={$cellWidthIntProxy} errors={$errors.cell?.width} />
		<CellHeightInput
			bind:value={$cellHeightIntProxy}
			errors={$errors.cell?.height}
			disabled={isCellSquareAspectRatio}
		/>
		<CellScaleInput bind:value={$cellScaleIntProxy} errors={$errors.cell?.scale} />
		<CellRadiusInput bind:value={$cellRadiusIntProxy} errors={$errors.cell?.radius} />
	</div>

	<div class="divider" />

	<PixelFullyOpaqueInput bind:checked={$form.pixel.fullyOpaque} />

	<div class="divider" />

	<RenderImagesButton />
</form>
