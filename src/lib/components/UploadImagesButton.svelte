<script lang="ts">
	import MaterialSymbolsImageArrowUpRounded from '~icons/material-symbols/image-arrow-up-rounded';

	function onUploadImages() {
		console.log('onUploadImages');
	}
</script>

<button type="button" class="btn btn-primary w-full" onclick={onUploadImages}>
	<MaterialSymbolsImageArrowUpRounded class="size-6" />
	Upload images
</button>
