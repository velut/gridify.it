<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<div class="bg-base-300 grid gap-4 rounded-xl p-4">
	{@render children()}
</div>
