<script lang="ts">
	import Gallery from '$lib/components/Gallery.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<main class="container mx-auto flex h-full flex-col gap-6 p-6 sm:flex-row sm:items-start">
	<Sidebar />
	<Gallery />
</main>
