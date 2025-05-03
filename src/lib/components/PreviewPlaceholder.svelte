<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import MaterialSymbolsImageSearchRounded from '~icons/material-symbols/image-search-rounded';
</script>

<Card class="grid place-items-center">
	<div class="text-base-content/65 flex items-center justify-center gap-2 font-bold md:flex-col">
		<MaterialSymbolsImageSearchRounded class="size-6 md:size-12" />
		<span class="text-sm md:hidden">Upload an image to start</span>
		<span class="hidden max-w-96 text-center text-balance md:block"
			>Upload or drag and drop an image on the page to start</span
		>
	</div>
</Card>
