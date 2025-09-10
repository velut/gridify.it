<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import MaterialSymbolsResetWrenchRounded from '~icons/material-symbols/reset-wrench-rounded';

	const { renderOpts } = getAppState();
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
