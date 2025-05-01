<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import ActionsSidebar from '$lib/components/ActionsSidebar.svelte';
	import EmptyPlaceholder from '$lib/components/EmptyPlaceholder.svelte';
	import Preview from '$lib/components/Preview.svelte';

	let { images } = getAppStateContext();
</script>

<div class="grid gap-4 md:grid-cols-[auto_minmax(0,1fr)]">
	<ActionsSidebar />

	{#if images.hasOutputImages()}
		<Preview />
	{:else}
		<EmptyPlaceholder />
	{/if}
</div>
