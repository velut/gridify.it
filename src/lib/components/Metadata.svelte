<script lang="ts">
	import { pageTitle, pageUrl, projectName } from '$lib/metadata';

	export let title: string;
	export let description: string;
	export let path = '';

	$: title = pageTitle(title);
	$: url = pageUrl(path);
</script>

<svelte:head>
	<!-- Title and description -->
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- OpenGraph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content="/android-chrome-192x192.png" />
	<meta property="og:image:alt" content={`${projectName} logo, a chequered flag`} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content={projectName} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>
