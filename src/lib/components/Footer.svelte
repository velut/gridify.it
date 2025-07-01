<script lang="ts">
	const commitShort = __GIT_COMMIT.slice(0, 7);
	const ghUrl = 'https://github.com/velut/gridify.it';
	const ghCommitUrl = `${ghUrl}/commit/${__GIT_COMMIT}`;
</script>

<footer class="border-t">
	<div
		class="text-muted-foreground flex flex-col justify-between gap-4 p-4 text-xs md:flex-row md:items-center"
	>
		<div>
			Made by
			<a href="https://github.com/velut" class="font-bold underline underline-offset-4"
				>Edoardo Scibona</a
			>
		</div>
		<nav class="flex flex-col gap-2 md:flex-row md:items-center">
			<a href={ghCommitUrl} class="underline-offset-4 hover:underline">{commitShort}</a>
			<a href={ghUrl} class="underline-offset-4 hover:underline">GitHub</a>
			<a href="/third-party-licenses.txt" class="underline-offset-4 hover:underline">OSS licenses</a
			>
			<a href="/privacy/" class="underline-offset-4 hover:underline">Privacy policy</a>
			<a href="/about/" class="underline-offset-4 hover:underline">About</a>
		</nav>
	</div>
</footer>
