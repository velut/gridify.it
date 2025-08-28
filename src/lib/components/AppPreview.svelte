<script lang="ts">
	import { getAppStateContext } from '$lib/state/app-state.svelte';
	import PreviewGallery from '$lib/components/PreviewGallery.svelte';
	import PreviewMode from '$lib/components/PreviewMode.svelte';
	import PreviewPlaceholder from '$lib/components/PreviewPlaceholder.svelte';

	const { images } = getAppStateContext();
</script>

<div class="card overflow-y-auto">
	<section class="h-full">
		{#if images.hasOutputImages()}
			<div class="grid h-full grid-rows-[auto_minmax(0,1fr)] gap-6">
				<PreviewMode />
				<PreviewGallery />
			</div>
		{:else}
			<PreviewPlaceholder />
		{/if}
	</section>
</div>
