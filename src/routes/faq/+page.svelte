<script lang="ts">
	import Metadata from '$lib/components/Metadata.svelte';
	import { firefoxDesktopUrl } from '$lib/firefox-desktop-url';
	import { githubIssuesUrl, projectName } from '$lib/metadata';
</script>

<Metadata title="FAQ" description={`Frequently asked questions for ${projectName}`} path="faq" />

<div class="flex items-center justify-center p-8">
	<article class="prose mb-24">
		<hgroup>
			<h1>FAQ</h1>
			<p>This is a list of frequently asked questions about this website.</p>
			<p>Last updated on May 12, 2023.</p>
		</hgroup>

		<h2>What can I use this tool for?</h2>
		<p>
			You can use this tool to easily <b>add a customizable grid</b> to your images or pixel art creations.
		</p>
		<p>See the pictures below for some examples of what you can do.</p>
		<p>TODO: pictures</p>

		<h2>Is this tool free to use?</h2>
		<p><strong>Yes.</strong> This tool is completely free to use.</p>

		<h2>Are my images kept private?</h2>
		<p>
			<strong>Yes.</strong> This tool works entirely inside your browser and no file ever leaves your
			device.
		</p>

		<h2>Which images can I process?</h2>
		<p>
			<strong>It depends.</strong> As this tool runs inside your browser, you should be able to process
			the images natively supported by your browser.
		</p>
		<p>
			We suggest using the desktop version of <a href={firefoxDesktopUrl}>Mozilla Firefox</a> as in our
			testing it supported most available image formats and also had the best processing speed.
		</p>

		<h2>How many images can I process?</h2>
		<p>
			<strong>As many as you want.</strong> You can process one image at a time or many images together.
		</p>
		<p>
			Note, however, that the more images you process together the slower the tool will be,
			especially on less powerful devices. The same applies to high resolution images.
		</p>

		<h2>I found an error / I want to ask another question.</h2>
		<p>
			Please <a href={githubIssuesUrl}>open an issue on Github</a>, it's the fastest way to have
			your question seen.
		</p>
	</article>
</div>
