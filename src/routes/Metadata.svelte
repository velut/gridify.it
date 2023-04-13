<script lang="ts">
	import { pageTitle, pageUrl } from '../lib/metadata';

	export let title: string;
	export let description: string;
	export let path: string;

	$: title = pageTitle(title);
	$: url = pageUrl(path);
</script>

<svelte:head>
	<!-- Title and description -->
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- OpenGraph -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>
