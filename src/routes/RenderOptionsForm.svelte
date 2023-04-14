<script lang="ts">
	import { renderOptionsFormSchema, type RenderOptionsForm } from '$lib/render-options-form';
	import reporter from '@felte/reporter-tippy';
	import { validator } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import RenderOptionsFormCellInputs from './RenderOptionsFormCellInputs.svelte';
	import RenderOptionsFormGridInputs from './RenderOptionsFormGridInputs.svelte';
	import RenderOptionsFormPixelInputs from './RenderOptionsFormPixelInputs.svelte';
	import RenderOptionsFormRenderImagesButton from './RenderOptionsFormRenderImagesButton.svelte';

	const { form, data } = createForm<RenderOptionsForm>({
		initialValues: {
			grid: { type: 'none', strokeSize: '1', strokeColor: '#000000' },
			cell: { size: '1', scale: '1', radius: '0' },
			pixel: { fullyOpaque: false }
		},
		onSubmit: (values) => {
			console.log('onSubmit');
			console.log(JSON.stringify(values, null, 2));
		},
		extend: [validator({ schema: renderOptionsFormSchema }), reporter()]
	});
</script>

<form use:form class="flex grow flex-col justify-between">
	<RenderOptionsFormGridInputs />
	<RenderOptionsFormCellInputs />
	<RenderOptionsFormPixelInputs />
	<RenderOptionsFormRenderImagesButton />
</form>

<!-- <pre>{JSON.stringify($data, null, 2)}</pre> -->
