<script lang="ts">
	import { AppState, setAppStateContext } from '$lib/app-state.svelte';
	import DownloadImagesButton from '$lib/components/DownloadImagesButton.svelte';
	import RemoveImagesButton from '$lib/components/RemoveImagesButton.svelte';
	import RenderImagesButton from '$lib/components/RenderImagesButton.svelte';
	import RenderOptionsForm from '$lib/components/RenderOptionsForm.svelte';
	import ResetRenderOptionsButton from '$lib/components/ResetRenderOptionsButton.svelte';
	import UploadImagesButton from '$lib/components/UploadImagesButton.svelte';

	let appState = new AppState();
	setAppStateContext(appState);

	function onUploadImages() {
		console.log('onUploadImages');
	}

	function onRemoveImages() {
		console.log('onRemoveImages');
	}

	function onDownloadImages() {
		console.log('onDownloadImages');
	}
</script>

<div class="grid gap-4 overflow-hidden p-4">
	<div class="bg-base-300 grid gap-4 rounded-xl p-4">
		<UploadImagesButton {onUploadImages} />
		<RemoveImagesButton {onRemoveImages} />
	</div>

	<div class="bg-base-300 grid gap-4 rounded-xl p-4">
		<RenderOptionsForm />
		<ResetRenderOptionsButton />
	</div>

	<div class="bg-base-300 grid gap-4 rounded-xl p-4">
		<RenderImagesButton />
		<DownloadImagesButton {onDownloadImages} />
	</div>
</div>
