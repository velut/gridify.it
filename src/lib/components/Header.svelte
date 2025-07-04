<script lang="ts">
	import { page } from '$app/state';
	import GridifyButton from '$lib/components/GridifyButton.svelte';
	import HelpButton from '$lib/components/HelpButton.svelte';
	import OpenAppButton from '$lib/components/OpenAppButton.svelte';
	import ThemeButton from '$lib/components/ThemeButton.svelte';
</script>

<header class="border-b">
	<div class="flex items-center justify-between gap-2 p-4">
		<GridifyButton />

		<div class="flex items-center gap-4">
			<ThemeButton />

			<div class="bg-border h-8 w-[1px]"></div>

			{#if page.route.id === '/app'}
				<HelpButton />
			{:else}
				<OpenAppButton />
			{/if}
		</div>
	</div>
</header>
