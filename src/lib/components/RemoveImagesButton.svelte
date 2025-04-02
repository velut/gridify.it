<script lang="ts">
	import MaterialSymbolsResetImageRounded from '~icons/material-symbols/reset-image-rounded';

	type Props = {
		onRemoveImages: () => any;
	};

	let { onRemoveImages }: Props = $props();
</script>

<button class="btn btn-error btn-outline w-full" onclick={onRemoveImages}>
	<MaterialSymbolsResetImageRounded class="size-6" />
	Remove images
</button>
