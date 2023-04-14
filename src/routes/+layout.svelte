<script lang="ts">
	import 'tippy.js/dist/tippy.css';
	import '../app.css';
	import Footer from './Footer.svelte';
	import Navbar from './Navbar.svelte';
</script>

<div class="flex h-screen flex-col">
	<Navbar />

	<div class="grow">
		<slot />
	</div>

	<Footer />
</div>
