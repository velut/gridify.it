<script lang="ts">
	import { run } from 'svelte/legacy';

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
	import { defaults, intProxy, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	const {
		form,
		errors,
		tainted,
		isTainted,
		reset: resetForm,
		enhance
	} = superForm(defaults(zod(renderOptionsSchema)), {
		SPA: true,
		dataType: 'json',
		validators: zod(renderOptionsSchema),
		resetForm: false,
		onUpdate({ form }) {
			if (form.valid) {
				$renderOptions = renderOptionsSchema.parse(form.data);
			}
		}
	});

	const gridStrokeSizeIntProxy = intProxy(form, 'grid.stroke.size');
	const cellWidthIntProxy = intProxy(form, 'cell.width');
	const cellHeightIntProxy = intProxy(form, 'cell.height');
	const cellScaleIntProxy = intProxy(form, 'cell.scale');
	const cellRadiusIntProxy = intProxy(form, 'cell.radius');

	let isFormTainted = $derived(isTainted($tainted));
	let isGridDisabled = $derived($form.grid.type === 'none');
	let isCellSquareAspectRatio = $derived($form.cell.squareAspectRatio);
	run(() => {
		if (isGridDisabled) {
			$gridStrokeSizeIntProxy = 'reset-trigger';
			$gridStrokeSizeIntProxy = '1';
		}
	});
	run(() => {
		if (isCellSquareAspectRatio) {
			$cellHeightIntProxy = 'reset-trigger';
			$cellHeightIntProxy = '1';
		}
	});
</script>

<form method="POST" use:enhance>
	<ResetRenderOptionsButton {isFormTainted} {resetForm} />

	<div class="divider"></div>

	<div class="space-y-2">
		<GridTypeInput bind:value={$form.grid.type} />
		<GridStrokeSizeInput
			bind:value={$gridStrokeSizeIntProxy}
			errors={$errors.grid?.stroke?.size}
			disabled={isGridDisabled}
		/>
		<GridStrokeColorInput bind:value={$form.grid.stroke.color} />
	</div>

	<div class="divider"></div>

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

	<div class="divider"></div>

	<PixelFullyOpaqueInput bind:checked={$form.pixel.fullyOpaque} />

	<div class="divider"></div>

	<RenderImagesButton />
</form>
