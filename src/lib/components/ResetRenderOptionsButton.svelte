<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import MaterialSymbolsResetWrenchRounded from '~icons/material-symbols/reset-wrench-rounded';

	let { renderOptions: opts } = getAppStateContext();
</script>

<Button variant="destructive" onclick={() => opts.reset()} disabled={opts.isDefault()}>
	<MaterialSymbolsResetWrenchRounded />
	Reset render options
</Button>
