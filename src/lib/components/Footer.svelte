<script lang="ts">
	import { githubUrl, projectName } from '$lib/metadata';
</script>

<footer class="footer bg-base-200 p-8 text-base text-base-content">
	<div>
		<a href="/" class="link-hover link flex items-center gap-2">
			<img class="h-5 w-5" src="/favicon.svg" alt="{projectName} logo, a chequered flag" />
			<div class="text-lg font-bold">{projectName}</div>
		</a>
		<p>
			Created by <a href="https://www.edoardoscibona.com" target="_blank" class="link"
				>Edoardo Scibona</a
			>.
		</p>
	</div>

	<div>
		<span class="footer-title">Links</span>
		<a href="/" class="link-hover link">Homepage</a>
		<a href="/faq" class="link-hover link">FAQ</a>
		<a href={githubUrl} target="_blank" class="link-hover link">GitHub Project</a>
	</div>

	<div>
		<span class="footer-title">Legal</span>
		<a href="/privacy" class="link-hover link">Privacy Policy</a>
		<a href="/licenses" class="link-hover link">Licenses</a>
	</div>
</footer>
