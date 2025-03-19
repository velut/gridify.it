<script lang="ts">
	import { files } from '$lib/stores';

	const resetFiles = async () => {
		$files = [];
	};

	let disabled = $derived($files.length === 0);
</script>

<button
	title="Click to remove all images"
	class="btn btn-outline btn-sm hover:btn-error w-full"
	onclick={resetFiles}
	{disabled}>Remove Images</button
>
