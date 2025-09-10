<script lang="ts">
	import { AppState, setAppStateContext } from '$lib/state/app-state.svelte';
	import AppActions from '$lib/components/AppActions.svelte';
	import AppPreview from '$lib/components/AppPreview.svelte';
	import AppRenderOpts from '$lib/components/AppRenderOpts.svelte';

	setAppStateContext(new AppState());
</script>

<div
	class="grid h-full divide-y overflow-y-auto lg:grid-cols-[auto_minmax(0,1fr)] lg:divide-x lg:divide-y-0"
>
	<div class="grid divide-y overflow-y-auto sm:grid-cols-[auto_auto] sm:divide-x sm:divide-y-0">
		<AppActions />
		<AppRenderOpts />
	</div>
	<AppPreview />
</div>
