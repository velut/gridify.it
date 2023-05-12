<script lang="ts">
	import Metadata from '$lib/components/Metadata.svelte';
	import { licenses } from '$lib/licenses';
	import { projectName } from '$lib/metadata';
</script>

<Metadata
	title="Licenses for Third Party Software"
	description={`Licenses for third party software used on ${projectName}`}
	path="licenses"
/>

<div class="flex items-center justify-center p-8">
	<article class="prose">
		<hgroup>
			<h1>Licenses for Third Party Software</h1>
			<p>This is a list of third party software used on {projectName}.</p>
		</hgroup>

		{#each licenses as license}
			<h2>
				<a href={license.url} class="link-hover link text-lg">
					{license.name}
				</a>
			</h2>

			<p>
				Version: {license.version}
				<br />
				License: {license.license}
			</p>

			{#if license.licenseText}
				<pre class="w-screen sm:w-full">
					<code>
						{license.licenseText}
					</code>
				</pre>
			{/if}
		{/each}
	</article>
</div>
