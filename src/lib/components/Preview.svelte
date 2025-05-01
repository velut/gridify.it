<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import PreviewGallery from '$lib/components/PreviewGallery.svelte';
	import PreviewMode from '$lib/components/PreviewMode.svelte';
</script>

<Card class="grid-rows-[auto_minmax(0,1fr)]">
	<PreviewMode />
	<PreviewGallery />
</Card>
