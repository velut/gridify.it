<script lang="ts">
	import Article from '$lib/components/Article.svelte';
	import ArticleSection from '$lib/components/ArticleSection.svelte';
	import ArticleTitle from '$lib/components/ArticleTitle.svelte';
</script>

<Article>
	<ArticleTitle title="Privacy policy" />

	<ArticleSection>
		<p>
			This is the privacy policy for gridify.it
			<br />Last updated on July 09, 2025.
		</p>
	</ArticleSection>

	<ArticleSection>
		<h2>Your information on gridify.it</h2>

		<h3>Personal information</h3>
		<p>On gridify.it, we do not collect personal information from our visitors.</p>

		<h3>Uploaded images</h3>
		<p>All images are uploaded and processed locally on your device and are never sent to us.</p>

		<h3>First-party cookies</h3>
		<p>
			We save your theme preference locally in <code>localStorage.theme</code> with a value of
			<code>light</code> or <code>dark</code> when you explicitly click on the theme switcher button
			present in the header. This data is never sent to us.
		</p>
	</ArticleSection>

	<ArticleSection>
		<h2>Our host</h2>

		<h3>Hosting</h3>
		<p>
			We host gridify.it on <a href="https://bunny.net/">Bunny.net</a>, an EU based company, which
			may collect some data to provide its services. To learn more about the data collected by
			Bunny.net, you can read their <a href="https://bunny.net/privacy">privacy policy</a>.
		</p>

		<h3>Server logs</h3>
		<p>
			Our host, <a href="https://bunny.net/">Bunny.net</a>, provides us with
			<a href="https://docs.bunny.net/docs/cdn-log-format">server logs</a> that contain information
			about requests made to gridify.it. Every IP address present in the logs is automatically
			anonymized to <code>0.0.0.0</code> to prevent storing personal data.
		</p>
	</ArticleSection>

	<ArticleSection>
		<h2>External websites</h2>

		<h3>Links to other websites</h3>
		<p>
			On gridify.it, you may find links to external websites not operated by us and thus with
			different privacy policies. We recommend you to review the privacy policy of any website you
			may visit.
		</p>
	</ArticleSection>

	<ArticleSection>
		<h2>Contact information</h2>

		<h3>How to contact us</h3>
		<p>
			You can contact the website owner, Edoardo Scibona, by <a
				href="https://github.com/velut/gridify.it/issues">opening an issue on GitHub</a
			>
			or by sending an email to
			<a href="mailto:scibona.edoardo@proton.me">scibona.edoardo@proton.me</a>.
		</p>
	</ArticleSection>
</Article>
