<script lang="ts">
	import Metadata from '$lib/components/Metadata.svelte';
	import { projectName } from '$lib/metadata';
</script>

<Metadata title="Privacy Policy" description={`Privacy policy for ${projectName}`} path="privacy" />

<div class="flex items-center justify-center p-8">
	<article class="prose">
		<hgroup>
			<h1>Privacy Policy</h1>
			<p>Last updated on April 13, 2023.</p>
		</hgroup>

		<h2>First Party</h2>
		<p>On this website, we do not directly collect personal information from our visitors.</p>

		<h2>Hosting</h2>
		<p>
			This website is hosted by <a href="https://vercel.com/">Vercel</a>
			, which may collect some data to provide its services. To learn more about the data collected by
			Vercel, you can read their{' '}
			<a href="https://vercel.com/legal/privacy-policy">privacy policy</a>
			.
		</p>

		<h2>External Websites</h2>
		<p>
			This website may contain links to external websites not operated by us and thus with different
			privacy policies. We recommend you to review the privacy policy of any website you may visit.
		</p>

		<h2>Contact Information</h2>
		<p>
			You can contact the website owner on{' '}
			<a href="https://github.com/velut">Github</a> or by{' '}
			<a href="mailto:info@jsdocs.io">email</a>.
		</p>
	</article>
</div>
