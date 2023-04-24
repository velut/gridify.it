<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import 'tippy.js/dist/tippy.css';
	import '../app.css';
</script>

<div class="flex h-screen flex-col">
	<Navbar />

	<div class="grow">
		<slot />
	</div>

	<Footer />
</div>
