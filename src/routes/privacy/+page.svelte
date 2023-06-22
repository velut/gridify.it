<script lang="ts">
	import Metadata from '$lib/components/Metadata.svelte';
	import { githubIssuesUrl, projectName } from '$lib/metadata';
</script>

<Metadata title="Privacy Policy" description="Privacy policy for {projectName}" path="privacy" />

<main class="flex items-center justify-center p-4 sm:p-8">
	<article class="prose">
		<hgroup>
			<h1>Privacy Policy</h1>
			<p>
				This is the privacy policy for {projectName}.
				<br />
				Last updated on June 22, 2023.
			</p>
		</hgroup>

		<div class="divider" />

		<ul>
			<li>
				<p>
					<strong>Information We Collect</strong>
				</p>
				<p>On this website, we do not collect personal information from our visitors.</p>
			</li>

			<li>
				<p>
					<strong>Image Processing</strong>
				</p>
				<p>All images are processed locally on your device and are never sent to us.</p>
			</li>

			<li>
				<p>
					<strong>Necessary Cookies</strong>
				</p>
				<p>
					We save your theme preference in <code>localStorage.theme</code> with a value of
					<code>light</code>
					or <code>dark</code> when you explicitly click on the <strong>Change Theme</strong> switch
					present in the footer.
				</p>
			</li>

			<li>
				<p>
					<strong>Hosting</strong>
				</p>
				<p>
					This website is hosted by <a href="https://bunny.net/" target="_blank">Bunny.net</a>
					, an EU based company, which may collect some data to provide its services. To learn more about
					the data collected by Bunny.net, you can read their{' '}
					<a href="https://bunny.net/privacy" target="_blank">privacy policy</a>
					.
				</p>
			</li>

			<li>
				<p>
					<strong>External Websites</strong>
				</p>
				<p>
					This website may contain links to external websites not operated by us and thus with
					different privacy policies. We recommend you to review the privacy policy of any website
					you may visit.
				</p>
			</li>

			<li>
				<p><strong>Contact Information</strong></p>
				<p>
					You can contact the website owner, Edoardo Scibona, on{' '}
					<a href={githubIssuesUrl} target="_blank">Github</a> or by{' '}
					<a href="mailto:info@jsdocs.io">email</a>.
				</p>
			</li>
		</ul>

		<div class="divider" />
	</article>
</main>
