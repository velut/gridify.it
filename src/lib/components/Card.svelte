<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		children: Snippet;
		class?: ClassValue;
	};

	let props: Props = $props();
</script>

<div class={['bg-base-300 grid gap-4 rounded-xl p-4', props.class]}>
	{@render props.children()}
</div>
