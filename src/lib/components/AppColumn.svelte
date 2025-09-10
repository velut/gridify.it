<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<div
	class="overflow-y-auto p-4 [scrollbar-color:_var(--scrollbar-thumb)_var(--scrollbar-track)] [scrollbar-width:thin]"
>
	{@render children()}
</div>
