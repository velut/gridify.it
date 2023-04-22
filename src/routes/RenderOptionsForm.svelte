<script lang="ts">
	import {
		renderOptionsFormSchema,
		renderOptionsFormValuesSchema,
		type RenderOptionsForm
	} from '$lib/render-options-form';
	import { renderOptions } from '$lib/stores';
	import reporter from '@felte/reporter-tippy';
	import { validator } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import RenderOptionsFormCellInputs from './RenderOptionsFormCellInputs.svelte';
	import RenderOptionsFormGridInputs from './RenderOptionsFormGridInputs.svelte';
	import RenderOptionsFormPixelInputs from './RenderOptionsFormPixelInputs.svelte';
	import RenderOptionsFormRenderImagesButton from './RenderOptionsFormRenderImagesButton.svelte';
	import RenderOptionsFormResetOptionsButton from './RenderOptionsFormResetOptionsButton.svelte';

	const { form, isDirty, reset } = createForm<RenderOptionsForm>({
		initialValues: {
			grid: { type: 'none', strokeSize: '1', strokeColor: '#000000' },
			cell: { size: '1', scale: '1', radius: '0' },
			pixel: { fullyOpaque: false }
		},
		onSubmit: (values) => {
			$renderOptions = renderOptionsFormValuesSchema.parse(values);
		},
		extend: [validator({ schema: renderOptionsFormSchema }), reporter()]
	});
</script>

<form use:form>
	<RenderOptionsFormGridInputs />
	<RenderOptionsFormCellInputs />
	<RenderOptionsFormPixelInputs />
	<div class="space-y-4">
		<RenderOptionsFormResetOptionsButton isDirty={$isDirty} {reset} />
		<RenderOptionsFormRenderImagesButton />
	</div>
</form>
