<script lang="ts">
	import { getFiles } from '$lib/get-files';
	import { files } from '$lib/stores';

	const inputId = 'files-input';
	const accept = 'image/*';

	const setFiles = async (event: Event) => {
		$files = await getFiles(event, accept);
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
		on:change={setFiles}
		class="file-input w-full"
	/>
</div>
