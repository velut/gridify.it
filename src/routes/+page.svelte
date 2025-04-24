<script lang="ts">
	import { AppState, setAppStateContext } from '$lib/app-state.svelte';
	import Card from '$lib/components/Card.svelte';
	import DownloadImagesButton from '$lib/components/DownloadImagesButton.svelte';
	import RemoveImagesButton from '$lib/components/RemoveImagesButton.svelte';
	import RenderImagesButton from '$lib/components/RenderImagesButton.svelte';
	import RenderOptionsForm from '$lib/components/RenderOptionsForm.svelte';
	import ResetRenderOptionsButton from '$lib/components/ResetRenderOptionsButton.svelte';
	import UploadImagesButton from '$lib/components/UploadImagesButton.svelte';

	setAppStateContext(new AppState());
</script>

<div class="grid gap-4 overflow-hidden p-4">
	<Card>
		<UploadImagesButton />
		<RemoveImagesButton />
	</Card>

	<Card>
		<RenderOptionsForm />
		<ResetRenderOptionsButton />
	</Card>

	<Card>
		<RenderImagesButton />
		<DownloadImagesButton />
	</Card>
</div>
