<script lang="ts">
	import Divider from '$lib/components/Divider.svelte';
	import DownloadImagesButton from '$lib/components/DownloadImagesButton.svelte';
	import RemoveImagesButton from '$lib/components/RemoveImagesButton.svelte';
	import RenderImagesButton from '$lib/components/RenderImagesButton.svelte';
	import ResetRenderOptionsButton from '$lib/components/ResetRenderOptionsButton.svelte';
	import UploadImagesButton from '$lib/components/UploadImagesButton.svelte';
	import AppColumn from '$lib/components/AppColumn.svelte';
	import UndoRedoRenderButtons from '$lib/components/UndoRedoRenderButtons.svelte';
	import PresetPixelArtButton from '$lib/components/PresetPixelArtButton.svelte';
	import PresetPhotoButton from '$lib/components/PresetPhotoButton.svelte';
</script>

<AppColumn>
	<div class="grid gap-4">
		<UploadImagesButton />
		<RemoveImagesButton />

		<Divider />

		<RenderImagesButton />
		<UndoRedoRenderButtons />
		<ResetRenderOptionsButton />

		<Divider />

		<PresetPixelArtButton />
		<PresetPhotoButton />

		<Divider />

		<DownloadImagesButton />
	</div>
</AppColumn>
