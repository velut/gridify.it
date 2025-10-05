<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		children: Snippet;
	};

	let { title, children }: Props = $props();
</script>

<div class="card">
	<header class="grid-rows-1">
		<h2>{title}</h2>
	</header>
	<section>
		<div class="grid gap-4">
			{@render children()}
		</div>
	</section>
</div>
