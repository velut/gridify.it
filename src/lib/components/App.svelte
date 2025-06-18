<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import AppActions from '$lib/components/AppActions.svelte';
	import Preview from '$lib/components/Preview.svelte';
	import PreviewPlaceholder from '$lib/components/PreviewPlaceholder.svelte';
	import RenderOptions from '$lib/components/RenderOptions.svelte';

	let { images } = getAppStateContext();
</script>

<main class="grid gap-4 overflow-y-auto p-4 lg:grid-cols-[auto_minmax(0,1fr)]">
	<div class="grid gap-4 overflow-y-auto sm:grid-cols-[auto_auto]">
		<AppActions />
		<RenderOptions />
	</div>

	{#if images.hasOutputImages()}
		<Preview />
	{:else}
		<PreviewPlaceholder />
	{/if}
</main>
