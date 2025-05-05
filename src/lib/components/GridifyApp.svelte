<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import Actions from '$lib/components/Actions.svelte';
	import Preview from '$lib/components/Preview.svelte';
	import PreviewPlaceholder from '$lib/components/PreviewPlaceholder.svelte';
	import RenderOptions from '$lib/components/RenderOptions.svelte';

	let { images } = getAppStateContext();
</script>

<div
	class="grid grid-cols-1 gap-4 p-4 lg:h-full lg:grid-cols-[auto_minmax(0,1fr)] lg:overflow-hidden"
>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-[auto_auto] lg:h-full lg:overflow-hidden">
		<Actions />
		<RenderOptions />
	</div>

	{#if images.hasOutputImages()}
		<Preview />
	{:else}
		<PreviewPlaceholder />
	{/if}
</div>
