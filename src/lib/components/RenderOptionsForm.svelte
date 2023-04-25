<script lang="ts">
	import RenderImagesButton from '$lib/components/RenderImagesButton.svelte';
	import RenderOptionsFormCellInputs from '$lib/components/RenderOptionsFormCellInputs.svelte';
	import RenderOptionsFormGridInputs from '$lib/components/RenderOptionsFormGridInputs.svelte';
	import RenderOptionsFormPixelInputs from '$lib/components/RenderOptionsFormPixelInputs.svelte';
	import ResetRenderOptionsButton from '$lib/components/ResetRenderOptionsButton.svelte';
	import {
		renderOptionsFormSchema,
		renderOptionsFormValuesSchema,
		type RenderOptionsForm
	} from '$lib/render-options-form';
	import { renderOptions } from '$lib/stores';
	import reporter from '@felte/reporter-tippy';
	import { validator } from '@felte/validator-zod';
	import { createForm } from 'felte';

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
		<ResetRenderOptionsButton isDirty={$isDirty} {reset} />
		<RenderImagesButton />
	</div>
</form>
