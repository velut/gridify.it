<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import HelpArticle from '$lib/components/HelpArticle.svelte';
</script>

<div class="grid min-h-screen grid-rows-[minmax(0,1fr)_auto]">
	<main class="grid place-items-center p-4">
		<HelpArticle />
	</main>

	<Footer />
</div>
