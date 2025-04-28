<script lang="ts">
	import { AppState, setAppStateContext } from '$lib/app-state.svelte';
	import GridifyApp from '$lib/components/GridifyApp.svelte';

	setAppStateContext(new AppState());
</script>

<div class="p-4">
	<GridifyApp />
</div>
