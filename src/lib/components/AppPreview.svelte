<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import PreviewImage from '$lib/components/PreviewImage.svelte';
	import PreviewHeader from '$lib/components/PreviewHeader.svelte';
	import PreviewPlaceholder from '$lib/components/PreviewPlaceholder.svelte';
	import AppColumn from '$lib/components/AppColumn.svelte';
	import PreviewTip from '$lib/components/PreviewTip.svelte';

	const { preview } = getAppState();
</script>

<AppColumn>
	<div class="h-full">
		{#if preview.hasImages()}
			<div class="grid h-full grid-rows-[auto_minmax(0,1fr)_auto] gap-6">
				<PreviewHeader />
				<PreviewImage />
				<PreviewTip />
			</div>
		{:else}
			<PreviewPlaceholder />
		{/if}
	</div>
</AppColumn>
