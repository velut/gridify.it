<script lang="ts">
	import MaterialSymbolsDownloadRounded from '~icons/material-symbols/download-rounded';

	type Props = {
		onDownloadImages: () => any;
	};

	let { onDownloadImages }: Props = $props();
</script>

<button class="btn btn-primary w-full" onclick={onDownloadImages}>
	<MaterialSymbolsDownloadRounded class="size-6" />
	Download images
</button>
