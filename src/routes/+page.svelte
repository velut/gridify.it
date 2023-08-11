<script lang="ts">
	import Gallery from '$lib/components/Gallery.svelte';
	import Metadata from '$lib/components/Metadata.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<Metadata
	title="Awesome grids for your images"
	description="Add a customizable grid to your images, photos, reference pictures, or pixel art designs. Use various grid types and line colors, resize images, and round the corners of grid cells."
/>

<main class="container mx-auto flex h-full flex-col gap-6 p-6 sm:flex-row sm:items-start">
	<Sidebar />
	<Gallery />
</main>
