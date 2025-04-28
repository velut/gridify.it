<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import DownloadImagesButton from '$lib/components/DownloadImagesButton.svelte';
	import RemoveImagesButton from '$lib/components/RemoveImagesButton.svelte';
	import RenderImagesButton from '$lib/components/RenderImagesButton.svelte';
	import RenderOptionsForm from '$lib/components/RenderOptionsForm.svelte';
	import ResetRenderOptionsButton from '$lib/components/ResetRenderOptionsButton.svelte';
	import UndoRenderImagesButton from '$lib/components/UndoRenderImagesButton.svelte';
	import UploadImagesButton from '$lib/components/UploadImagesButton.svelte';
</script>

<Card class="self-start">
	<UploadImagesButton />
	<RemoveImagesButton />

	<Divider />
	<RenderOptionsForm />
	<ResetRenderOptionsButton />

	<Divider />
	<RenderImagesButton />
	<UndoRenderImagesButton />

	<Divider />
	<DownloadImagesButton />
</Card>
