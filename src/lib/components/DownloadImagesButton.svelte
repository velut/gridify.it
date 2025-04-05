<script lang="ts">
	import MaterialSymbolsDownloadRounded from '~icons/material-symbols/download-rounded';

	function onDownloadImages() {
		console.log('onDownloadImages');
	}
</script>

<button class="btn btn-primary w-full" onclick={onDownloadImages}>
	<MaterialSymbolsDownloadRounded class="size-6" />
	Download images
</button>
