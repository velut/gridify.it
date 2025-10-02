<script lang="ts">
	import { getAppState } from '$lib/state/app-state.svelte';
	import { cn } from '$lib/utils/cn';

	const { preview } = getAppState();
	let image = $derived(preview.image);
</script>

<a href={image.url} target="_blank" title={image.file.name} class="contents">
	<img
		src={image.url}
		alt={image.file.name}
		class={cn(
			'max-h-full w-full object-contain object-top-left',
			preview.mode === 'pixel-art' && '[image-rendering:pixelated]'
		)}
	/>
</a>
