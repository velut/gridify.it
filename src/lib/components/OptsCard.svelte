<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		children: Snippet;
	};

	let { title, children }: Props = $props();
</script>

<div class="rounded-xl border">
	<div class="border-b flex items-center justify-center text-sm px-6 py-3 font-medium">
		{title}
	</div>
	<div class="grid gap-4 p-6">
		{@render children()}
	</div>
</div>
