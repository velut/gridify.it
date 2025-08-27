<script lang="ts">
	import { getThemeStateContext } from '$lib/theme-state.svelte';
	import MaterialSymbolsContrast from '~icons/material-symbols/contrast';

	const theme = getThemeStateContext();
</script>

<button
	type="button"
	class="btn-sm-icon-outline"
	title="Change theme"
	onclick={() => theme.toggle()}
>
	<MaterialSymbolsContrast class="size-4" />
	<span class="sr-only">Change theme</span>
</button>
