<script lang="ts">
	import { getFiles } from '$lib/get-files';
	import { handleFileDrop } from '$lib/handle-file-drop';
	import { files } from '$lib/stores';

	const inputId = 'files-input';
	const accept = 'image/*';

	const setFiles = async (event: Event) => {
		$files = await getFiles(event, accept);
	};
</script>

<div class="form-control w-full">
	<label for={inputId} class="btn-outline btn w-full">Select or drop images</label>
	<input
		use:handleFileDrop
		id={inputId}
		name={inputId}
		type="file"
		multiple
		{accept}
		on:change={setFiles}
		class="h-0 opacity-0"
	/>
</div>
