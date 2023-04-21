<script lang="ts">
	import Gallery from './Gallery.svelte';
	import Metadata from './Metadata.svelte';
	import Sidebar from './Sidebar.svelte';
</script>

<Metadata title="Add grids to your images" description="TODO:" />

<div class="container mx-auto flex h-full flex-col items-start gap-4 p-4 sm:flex-row">
	<Sidebar />
	<Gallery />
</div>
