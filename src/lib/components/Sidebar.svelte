<script lang="ts">
	import DownloadImagesButton from '$lib/components/DownloadImagesButton.svelte';
	import FilesInput from '$lib/components/FilesInput.svelte';
	import RemoveImagesButton from '$lib/components/RemoveImagesButton.svelte';
	import RenderOptionsForm from '$lib/components/RenderOptionsForm.svelte';
</script>

<div class="flex w-full flex-col gap-4 rounded-xl bg-base-300 p-4 shadow sm:w-1/2 lg:w-96">
	<FilesInput />
	<RemoveImagesButton />
	<RenderOptionsForm />
	<DownloadImagesButton />
</div>
