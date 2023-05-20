<script lang="ts">
	import Metadata from '$lib/components/Metadata.svelte';
	import { licenses } from '$lib/licenses';
	import { projectName } from '$lib/metadata';
</script>

<Metadata
	title="Licenses for Third Party Software"
	description="Licenses for third party software used on {projectName}"
	path="licenses"
/>

<div class="flex items-center justify-center p-4 sm:p-8">
	<article class="prose">
		<hgroup>
			<h1>Licenses for Third Party Software</h1>
			<p>This is a list of third party software and libraries used on {projectName}.</p>
		</hgroup>

		<div class="divider" />

		<ul>
			{#each licenses as license}
				<li>
					<a href={license.url} target="_blank" class="link-hover link font-bold">
						{license.name}
					</a>

					<p>
						Version: {license.version}
						<br />
						License: {license.license}
					</p>

					{#if license.licenseText}
						<pre class="w-64 sm:w-full">
							{license.licenseText}
						</pre>
					{/if}
				</li>
			{/each}
		</ul>

		<div class="divider" />
	</article>
</div>
