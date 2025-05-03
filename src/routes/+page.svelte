<script lang="ts">
	import { AppState, setAppStateContext } from '$lib/app-state.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import GridifyApp from '$lib/components/GridifyApp.svelte';

	setAppStateContext(new AppState());
</script>

<div class="grid h-full grid-rows-[minmax(0,1fr)_auto] overflow-hidden">
	<GridifyApp />
	<Footer />
</div>

<style>
	:global(body) {
		overflow: hidden;
		height: 100vh;
	}
</style>
