<script lang="ts">
	import DownloadImagesButton from '$lib/components/DownloadImagesButton.svelte';
	import RemoveImagesButton from '$lib/components/RemoveImagesButton.svelte';
	import RenderImagesButton from '$lib/components/RenderImagesButton.svelte';
	import RenderOptionsForm from '$lib/components/RenderOptionsForm.svelte';
	import ResetRenderOptionsButton from '$lib/components/ResetRenderOptionsButton.svelte';
	import UploadImagesButton from '$lib/components/UploadImagesButton.svelte';
	import { RenderOptionsState } from '$lib/render-options-state.svelte';

	let renderOptionsState = new RenderOptionsState();

	function onUploadImages() {
		console.log('onUploadImages');
	}

	function onRemoveImages() {
		console.log('onRemoveImages');
	}

	function onResetRenderOptions() {
		renderOptionsState.reset();
	}

	function onRenderOptionsSubmit() {
		console.log(JSON.stringify(renderOptionsState.toRenderOptions(), null, 2));
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
		<RenderOptionsForm {renderOptionsState} {onRenderOptionsSubmit} />
		<ResetRenderOptionsButton {onResetRenderOptions} />
	</div>

	<div class="bg-base-300 grid gap-4 rounded-xl p-4">
		<RenderImagesButton />
		<DownloadImagesButton {onDownloadImages} />
	</div>
</div>
