<script lang="ts">
	import Gallery from '$lib/components/Gallery.svelte';
	import Metadata from '$lib/components/Metadata.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { renderOptionsSuperForm } from '$lib/stores';
	import type { PageData } from './$types';

	export let data: PageData;

	$: $renderOptionsSuperForm = data.renderOptionsSuperForm;
</script>

<Metadata
	title="Awesome grids for your images"
	description="With pic2grid you can easily add a customizable grid to your images or pixel art creations. You can use different grid types and line colors, resize images, and round the corners of grid cells."
/>

<div class="container mx-auto flex h-full flex-col gap-6 p-6 sm:flex-row sm:items-start">
	<Sidebar />
	<Gallery />
</div>
