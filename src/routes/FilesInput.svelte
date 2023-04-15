<script lang="ts">
	import { getFiles } from '$lib/get-files';
	import { store } from '$lib/store';

	const inputId = 'files-input';
	const accept = 'image/*';

	const loadImages = async (event: Event) => {
		const files = await getFiles(event, accept);
		await store.loadImages(files);
	};
</script>

<div class="form-control w-full">
	<label for={inputId} class="sr-only">Choose image files</label>
	<input
		id={inputId}
		name={inputId}
		type="file"
		multiple
		{accept}
		on:change={loadImages}
		class="file-input w-full"
	/>
</div>
