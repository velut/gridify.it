<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';

	let { children } = $props();

	let title = $derived(`${page.data.title} | gridify.it`);
	let description = $derived(page.data.description);
	let url = $derived(page.url.toString());
	let ogImageUrl = $derived(new URL('/twitter_card.jpg', page.url).toString());
	const ogImageAlt = 'Promotional image for gridify.it';
</script>

<svelte:head>
	<!-- Title and description -->
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />

	<!-- Canonical URL -->
	<link rel="canonical" href={url} />

	<!-- OpenGraph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={ogImageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="628" />
	<meta property="og:image:alt" content={ogImageAlt} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content="gridify.it" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImageUrl} />
	<meta name="twitter:image:alt" content={ogImageAlt} />
	<meta name="twitter:creator" content="@EdoardoScibona" />
</svelte:head>

{@render children?.()}
