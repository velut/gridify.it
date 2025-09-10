<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<div
	class="p-4 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:_var(--scrollbar-thumb)_var(--scrollbar-track)]"
>
	{@render children()}
</div>
