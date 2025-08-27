<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import MaterialSymbolsResetWrenchRounded from '~icons/material-symbols/reset-wrench-rounded';

	const { renderOptions: opts } = getAppStateContext();
</script>

<button
	type="button"
	class="btn-secondary"
	onclick={() => opts.reset()}
	disabled={opts.isDefault()}
>
	<MaterialSymbolsResetWrenchRounded class="size-4" />
	Reset render options
</button>
