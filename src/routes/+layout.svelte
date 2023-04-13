<script lang="ts">
	import '../app.css';
	import Footer from './Footer.svelte';
	import Navbar from './Navbar.svelte';
</script>

<div class="flex flex-col h-screen">
	<Navbar />

	<div class="grow">
		<slot />
	</div>

	<Footer />
</div>
