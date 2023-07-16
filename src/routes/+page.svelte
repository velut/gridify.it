<script lang="ts">
	import Gallery from '$lib/components/Gallery.svelte';
	import Metadata from '$lib/components/Metadata.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { projectName } from '$lib/metadata';
</script>

<Metadata
	title="Awesome grids for your images"
	description="With {projectName} you can easily add a customizable grid to your images, photos, or pixel art creations. You can use different grid types and line colors, resize images, and round the corners of grid cells."
/>

<main class="container mx-auto flex h-full flex-col gap-6 p-6 sm:flex-row sm:items-start">
	<Sidebar />
	<Gallery />
</main>
