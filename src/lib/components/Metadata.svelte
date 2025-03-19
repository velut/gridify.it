<script lang="ts">
	import { run } from 'svelte/legacy';

	import { baseUrl, pageTitle, pageUrl, projectName } from '$lib/metadata';

	const twitterCardImageUrl = `${baseUrl}/twitter_card_image.jpg`;
	const twitterCardImageAlt = `Promotional image for ${projectName}`;
	const twitterCreator = '@EdoardoScibona';

	interface Props {
		title: string;
		description: string;
		path?: string;
	}

	let { title = $bindable(), description, path = '' }: Props = $props();

	run(() => {
		title = pageTitle(title);
	});
	let url = $derived(pageUrl(path));
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
	<meta property="og:image" content={twitterCardImageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="628" />
	<meta property="og:image:alt" content={twitterCardImageAlt} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content={projectName} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={twitterCardImageUrl} />
	<meta name="twitter:image:alt" content={twitterCardImageAlt} />
	<meta name="twitter:creator" content={twitterCreator} />
</svelte:head>
