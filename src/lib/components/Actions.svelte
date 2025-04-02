<script lang="ts">
	import MaterialSymbolsAnimatedImagesRounded from '~icons/material-symbols/animated-images-rounded';
	import MaterialSymbolsDownloadRounded from '~icons/material-symbols/download-rounded';
	import MaterialSymbolsImageArrowUpRounded from '~icons/material-symbols/image-arrow-up-rounded';
	import MaterialSymbolsResetImageRounded from '~icons/material-symbols/reset-image-rounded';
	import MaterialSymbolsResetWrenchRounded from '~icons/material-symbols/reset-wrench-rounded';

	type Props = {
		onUploadImages: () => void;
		onResetRenderOptions: () => void;
		onRemoveImages: () => void;
		onDownloadImages: () => void;
	};

	let { onUploadImages, onResetRenderOptions, onRemoveImages, onDownloadImages }: Props = $props();
</script>

<div class="grid grid-flow-col gap-4">
	<button class="btn btn-primary w-full" onclick={onUploadImages}>
		<MaterialSymbolsImageArrowUpRounded class="size-6" />
		Upload images
	</button>

	<button class="btn btn-error btn-outline w-full" onclick={onRemoveImages}>
		<MaterialSymbolsResetImageRounded class="size-6" />
		Remove images
	</button>

	<button class="btn btn-error btn-outline w-full" onclick={onResetRenderOptions}>
		<MaterialSymbolsResetWrenchRounded class="size-6" />
		Reset options
	</button>

	<button form="render-options-form" type="submit" class="btn btn-primary w-full">
		<MaterialSymbolsAnimatedImagesRounded class="size-6" />
		Render images
	</button>

	<button class="btn btn-primary w-full" onclick={onRemoveImages}>
		<MaterialSymbolsDownloadRounded class="size-6" />
		Download images
	</button>
</div>
