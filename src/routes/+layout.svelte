<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex h-screen flex-col">
	<Navbar />

	<div class="grow">
		{@render children()}
	</div>

	<Footer />
</div>
