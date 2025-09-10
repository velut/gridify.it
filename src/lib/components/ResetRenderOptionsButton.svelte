<script lang="ts">
	import { getAppStateContext } from '$lib/state/app-state.svelte';
	import MaterialSymbolsResetWrenchRounded from '~icons/material-symbols/reset-wrench-rounded';

	const { renderOpts } = getAppStateContext();
</script>

<button
	type="button"
	class="btn-secondary"
	onclick={() => renderOpts.reset()}
	disabled={renderOpts.isDefault()}
>
	<MaterialSymbolsResetWrenchRounded class="size-4" />
	Reset render options
</button>
