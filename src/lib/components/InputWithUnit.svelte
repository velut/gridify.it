<script lang="ts">
	import { cn } from '$lib/cn';
	import type { Snippet } from 'svelte';

	type Props = { unit: string; disabled?: boolean; children: Snippet };

	let { unit, disabled, children }: Props = $props();
</script>

<div class="flex items-center [&>input]:rounded-r-none">
	{@render children()}
	<div
		class={cn(
			'dark:bg-input/30 border-input text-muted-foreground grid h-9 min-w-11 place-items-center rounded-r-md border-y border-r bg-transparent px-3 py-1 text-sm',
			disabled && 'opacity-50'
		)}
	>
		{unit}
	</div>
</div>
