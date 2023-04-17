<script lang="ts">
	import DownloadImagesButton from './DownloadImagesButton.svelte';
	import FilesInput from './FilesInput.svelte';
	import RenderOptionsForm from './RenderOptionsForm.svelte';
</script>

<div class="flex w-full flex-col gap-4 rounded-xl bg-base-300 p-4 shadow md:w-1/2 lg:w-96">
	<FilesInput />
	<RenderOptionsForm />
	<DownloadImagesButton />
</div>
