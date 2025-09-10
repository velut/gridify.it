<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		children: Snippet;
	};

	let { title, children }: Props = $props();
</script>

<div class="rounded-xl border">
	<div class="flex items-center justify-center border-b px-6 py-3 text-sm font-medium">
		{title}
	</div>
	<div class="grid gap-4 p-6">
		{@render children()}
	</div>
</div>
