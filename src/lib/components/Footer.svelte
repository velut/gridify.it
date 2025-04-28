<script lang="ts">
	import { changeTheme } from '$lib/change-theme';
	import MaterialSymbolsBackgroundGridSmall from '~icons/material-symbols/background-grid-small';

	const commitShort = __GIT_COMMIT.slice(0, 7);
	const ghUrl = 'https://github.com/velut/gridify.it';
	const ghCommitUrl = `${ghUrl}/commit/${__GIT_COMMIT}`;
</script>

<footer
	class="footer lg:footer-horizontal bg-base-200 text-base-content items-center p-4 sm:gap-y-4"
>
	<aside class="grid-flow-row items-center sm:grid-flow-col">
		<a href="/" class="link link-hover flex items-center gap-2 font-bold">
			<MaterialSymbolsBackgroundGridSmall class="size-6" />
			gridify.it
		</a>
		<div class="hidden sm:block">-</div>
		<div>
			Created by
			<a href="https://github.com/velut" class="link link-hover font-bold">Edoardo Scibona</a>
		</div>
	</aside>
	<nav class="grid-flow-row gap-4 sm:grid-flow-col lg:place-self-center lg:justify-self-end">
		<a href={ghCommitUrl} class="link link-hover">{commitShort}</a>
		<a href={ghUrl} class="link link-hover">GitHub</a>
		<a href="/third-party-licenses.txt" class="link link-hover">OSS licenses</a>
		<a href="/privacy/" class="link link-hover">Privacy policy</a>
		<button type="button" class="link link-hover" onclick={changeTheme}>Change theme</button>
	</nav>
</footer>
