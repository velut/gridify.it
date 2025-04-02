<script lang="ts">
	import MaterialSymbolsImageArrowUpRounded from '~icons/material-symbols/image-arrow-up-rounded';

	type Props = {
		onUploadImages: () => any;
	};

	let { onUploadImages }: Props = $props();
</script>

<button class="btn btn-primary w-full" onclick={onUploadImages}>
	<MaterialSymbolsImageArrowUpRounded class="size-6" />
	Upload images
</button>
