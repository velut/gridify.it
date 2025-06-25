<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import AppActions from '$lib/components/AppActions.svelte';
	import AppPreview from '$lib/components/AppPreview.svelte';
	import AppPreviewPlaceholder from '$lib/components/AppPreviewPlaceholder.svelte';
	import AppRenderOptions from '$lib/components/AppRenderOptions.svelte';

	let { images } = getAppStateContext();
</script>

<main class="grid gap-4 overflow-y-auto p-4 lg:grid-cols-[auto_minmax(0,1fr)]">
	<div class="grid gap-4 overflow-y-auto sm:grid-cols-[auto_auto]">
		<AppActions />
		<AppRenderOptions />
	</div>

	{#if images.hasOutputImages()}
		<AppPreview />
	{:else}
		<AppPreviewPlaceholder />
	{/if}
</main>
