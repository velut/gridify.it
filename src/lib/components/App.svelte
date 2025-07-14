<script lang="ts">
	import { AppState, setAppStateContext } from '$lib/app-state.svelte';
	import AppActions from '$lib/components/AppActions.svelte';
	import AppPreview from '$lib/components/AppPreview.svelte';
	import AppRenderOptions from '$lib/components/AppRenderOptions.svelte';

	setAppStateContext(new AppState());
</script>

<div class="grid h-full gap-6 overflow-y-auto p-6 lg:grid-cols-[auto_minmax(0,1fr)]">
	<div class="grid gap-6 overflow-y-auto sm:grid-cols-[auto_auto]">
		<AppActions />
		<AppRenderOptions />
	</div>
	<AppPreview />
</div>
