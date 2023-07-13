<script lang="ts">
	import { files } from '$lib/stores';

	const resetFiles = async () => {
		$files = [];
	};

	$: disabled = $files.length === 0;
</script>

<button
	title="Click to remove all images"
	class="btn btn-outline btn-sm w-full hover:btn-error"
	on:click={resetFiles}
	{disabled}>Remove Images</button
>
