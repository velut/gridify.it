<script lang="ts">
	import { getAppStateContext } from '$lib/app-state.svelte';
	import MaterialSymbolsResetWrenchRounded from '~icons/material-symbols/reset-wrench-rounded';

	let { renderOptions: opts } = getAppStateContext();
</script>

<button
	type="button"
	class="btn btn-error btn-outline w-full"
	onclick={() => opts.reset()}
	disabled={opts.isDefault()}
>
	<MaterialSymbolsResetWrenchRounded class="size-6" />
	Reset options
</button>
