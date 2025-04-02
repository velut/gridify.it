<script lang="ts">
	import MaterialSymbolsResetWrenchRounded from '~icons/material-symbols/reset-wrench-rounded';

	type Props = {
		onResetRenderOptions: () => any;
	};

	let { onResetRenderOptions }: Props = $props();
</script>

<button class="btn btn-error btn-outline w-full" onclick={onResetRenderOptions}>
	<MaterialSymbolsResetWrenchRounded class="size-6" />
	Reset options
</button>
