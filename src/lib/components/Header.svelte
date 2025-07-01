<script lang="ts">
	import { page } from '$app/state';
	import GridifyButton from '$lib/components/GridifyButton.svelte';
	import HelpButton from '$lib/components/HelpButton.svelte';
	import OpenAppButton from '$lib/components/OpenAppButton.svelte';
</script>

<header class="border-b">
	<div class="flex items-center justify-between gap-2 p-4">
		<GridifyButton />
		{#if page.route.id === '/'}
			<OpenAppButton />
		{:else if page.route.id === '/app'}
			<HelpButton />
		{/if}
	</div>
</header>
