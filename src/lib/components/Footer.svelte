<script lang="ts">
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';
	import { githubCommitShort, githubCommitUrl, githubUrl, projectName } from '$lib/metadata';
	import IconChequeredFlag from '~icons/twemoji/chequered-flag';
</script>

<footer class="footer bg-base-200 text-base-content p-8 text-base">
	<div>
		<a href="/" class="link-hover link flex items-center gap-2 text-lg font-bold">
			<IconChequeredFlag class="h-6 w-6" />
			{projectName}
		</a>
		<p>
			Created by <a
				href="https://www.edoardoscibona.com"
				target="_blank"
				class="link-hover link font-bold">Edoardo Scibona</a
			>
		</p>
		<p class="text-sm">
			Commit: <a href={githubCommitUrl} target="_blank" class="link-hover link">
				{githubCommitShort}
			</a>
		</p>
	</div>

	<div>
		<span class="footer-title opacity-80">Links</span>
		<a href="/" class="link-hover link">Homepage</a>
		<a href="/faq/" class="link-hover link">FAQ &amp; Instructions</a>
		<a href={githubUrl} target="_blank" class="link-hover link">GitHub Project</a>
	</div>

	<div>
		<span class="footer-title opacity-80">Legal</span>
		<a href="/privacy/" class="link-hover link">Privacy Policy</a>
		<a href="/licenses/" class="link-hover link">Software Licenses</a>
	</div>

	<div>
		<span class="footer-title opacity-80">Theme</span>
		<ThemeSwitch />
	</div>
</footer>
