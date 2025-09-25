<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import MaterialSymbolsResetWrenchRounded from '~icons/material-symbols/reset-wrench-rounded';

	const {
		render: { opts }
	} = getAppState();
</script>

<button
	type="button"
	class="btn-secondary"
	onclick={() => {
		opts.reset();
	}}
	disabled={opts.isDefault()}
>
	<MaterialSymbolsResetWrenchRounded class="size-4" />
	Reset render options
</button>
