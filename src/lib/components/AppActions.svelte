<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import DownloadImagesButton from '$lib/components/DownloadImagesButton.svelte';
	import HelpLink from '$lib/components/HelpLink.svelte';
	import RemoveImagesButton from '$lib/components/RemoveImagesButton.svelte';
	import RenderImagesButton from '$lib/components/RenderImagesButton.svelte';
	import ResetRenderOptionsButton from '$lib/components/ResetRenderOptionsButton.svelte';
	import UndoRenderImagesButton from '$lib/components/UndoRenderImagesButton.svelte';
	import UploadImagesButton from '$lib/components/UploadImagesButton.svelte';
</script>

<Card class="flex flex-col justify-between gap-4">
	<div class="flex flex-col gap-4">
		<UploadImagesButton />
		<RemoveImagesButton />

		<Divider />
		<RenderImagesButton />
		<UndoRenderImagesButton />
		<ResetRenderOptionsButton />

		<Divider />
		<DownloadImagesButton />
	</div>

	<div class="flex flex-col gap-4">
		<Divider />
		<HelpLink />
	</div>
</Card>
