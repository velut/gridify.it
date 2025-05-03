<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import Actions from '$lib/components/Actions.svelte';
	import Preview from '$lib/components/Preview.svelte';
	import PreviewPlaceholder from '$lib/components/PreviewPlaceholder.svelte';
	import RenderOptions from '$lib/components/RenderOptions.svelte';

	let { images } = getAppStateContext();
</script>

<div class="grid grid-cols-[auto_auto_minmax(0,1fr)] gap-4 p-4">
	<Actions />
	<RenderOptions />

	{#if images.hasOutputImages()}
		<Preview />
	{:else}
		<PreviewPlaceholder />
	{/if}
</div>
