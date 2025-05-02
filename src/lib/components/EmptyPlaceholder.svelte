<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import MaterialSymbolsImageSearchRounded from '~icons/material-symbols/image-search-rounded';
</script>

<Card>
	<div class="text-base-content/65 flex items-center justify-center gap-2 md:flex-col">
		<MaterialSymbolsImageSearchRounded class="size-6 md:size-12" />
		<span class="text-sm font-bold md:hidden">Upload an image to start</span>
		<span class="hidden font-bold md:block md:max-w-96 md:text-center md:text-balance"
			>Upload or drag and drop an image on the page to start</span
		>
	</div>
</Card>
