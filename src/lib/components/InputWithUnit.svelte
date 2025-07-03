<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = { unit: string; disabled?: boolean; children: Snippet };

	let { unit, disabled, children }: Props = $props();
</script>

<div class="flex items-center [&>input]:rounded-r-none">
	{@render children()}
	<div
		class={[
			'bg-input/30 border-input text-muted-foreground grid h-9 min-w-11 place-items-center rounded-r-md border-y border-r px-3 py-1 text-sm',
			disabled && 'opacity-50'
		]}
	>
		{unit}
	</div>
</div>
