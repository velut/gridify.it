<script lang="ts">
	import { getAppStateContext } from '$lib/state/app-state.svelte';
	import PreviewGallery from '$lib/components/PreviewGallery.svelte';
	import PreviewMode from '$lib/components/PreviewMode.svelte';
	import PreviewPlaceholder from '$lib/components/PreviewPlaceholder.svelte';
	import AppColumn from './AppColumn.svelte';

	const { images } = getAppStateContext();
</script>

<AppColumn>
	<div class="h-full">
		{#if images.hasOutputImages()}
			<div class="grid h-full grid-rows-[auto_minmax(0,1fr)] gap-6">
				<PreviewMode />
				<PreviewGallery />
			</div>
		{:else}
			<PreviewPlaceholder />
		{/if}
	</div>
</AppColumn>
