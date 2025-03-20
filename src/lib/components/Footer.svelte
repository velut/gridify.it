<script lang="ts">
	import MaterialSymbolsBackgroundGridSmall from '~icons/material-symbols/background-grid-small';

	const commitShort = __GIT_COMMIT.slice(0, 7);
	const ghUrl = 'https://github.com/velut/gridify.it';
	const ghCommitUrl = `${ghUrl}/commit/${__GIT_COMMIT}`;
</script>

<footer class="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
	<aside class="grid-flow-row items-center md:grid-flow-col">
		<a href="/" class="link link-hover flex items-center gap-2 font-bold">
			<MaterialSymbolsBackgroundGridSmall class="size-6" />
			gridify.it
		</a>
		<div class="hidden md:block">-</div>
		<div>
			Created by
			<a href="https://github.com/velut" class="link link-hover font-bold">Edoardo Scibona</a>
		</div>
	</aside>
	<nav class="grid-flow-row gap-4 sm:grid-flow-col md:place-self-center md:justify-self-end">
		<a href={ghCommitUrl} class="link link-hover">{commitShort}</a>
		<a href={ghUrl} class="link link-hover">GitHub</a>
		<a href="/third-party-licenses.txt" class="link link-hover">OSS licenses</a>
		<a href="/privacy/" class="link link-hover">Privacy policy</a>
	</nav>
</footer>
