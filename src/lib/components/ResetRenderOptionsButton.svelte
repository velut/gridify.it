<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import MaterialSymbolsResetWrenchRounded from '~icons/material-symbols/reset-wrench-rounded';

	let opts = getAppStateContext().renderOptions;

	function resetRenderOptions() {
		opts.reset();
	}
</script>

<button type="button" class="btn btn-error btn-outline w-full" onclick={resetRenderOptions}>
	<MaterialSymbolsResetWrenchRounded class="size-6" />
	Reset options
</button>
