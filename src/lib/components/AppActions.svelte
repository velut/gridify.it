<script lang="ts">
	import Divider from '$lib/components/Divider.svelte';
	import DownloadImagesButton from '$lib/components/DownloadImagesButton.svelte';
	import RemoveImagesButton from '$lib/components/RemoveImagesButton.svelte';
	import RenderImagesButton from '$lib/components/RenderImagesButton.svelte';
	import ResetRenderOptionsButton from '$lib/components/ResetRenderOptionsButton.svelte';
	import UndoRenderImagesButton from '$lib/components/UndoRenderImagesButton.svelte';
	import UploadImagesButton from '$lib/components/UploadImagesButton.svelte';
	import AppColumn from '$lib/components/AppColumn.svelte';
</script>

<AppColumn>
	<div class="grid gap-4">
		<UploadImagesButton />
		<RemoveImagesButton />

		<Divider />

		<RenderImagesButton />
		<UndoRenderImagesButton />
		<ResetRenderOptionsButton />

		<Divider />

		<DownloadImagesButton />
	</div>
</AppColumn>
