<script lang="ts">
	import { files } from '$lib/stores';

	const resetFiles = async () => {
		$files = [];
	};

	$: disabled = $files.length === 0;
</script>

<button class="btn-outline btn-sm btn w-full hover:btn-error" on:click={resetFiles} {disabled}
	>Remove Images</button
>
