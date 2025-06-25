<script lang="ts">
	import { cn } from '$lib/cn';
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		children: Snippet;
		class?: ClassValue;
	};

	let props: Props = $props();
</script>

<div class={cn('bg-base-300 overflow-y-auto rounded-xl p-4', props.class)}>
	{@render props.children()}
</div>
