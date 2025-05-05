<script lang="ts">
	import { AppState, setAppStateContext } from '$lib/app-state.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import GridifyApp from '$lib/components/GridifyApp.svelte';

	setAppStateContext(new AppState());
</script>

<div class="grid min-h-screen grid-rows-[minmax(0,1fr)_auto] lg:h-full lg:min-h-auto">
	<GridifyApp />
	<Footer />
</div>

<style>
	/* lg breakpoint. */
	@media (width >= 64rem) {
		:global(body) {
			overflow: hidden;
			height: 100vh;
		}
	}
</style>
