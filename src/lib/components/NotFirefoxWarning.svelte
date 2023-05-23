<script lang="ts">
	import { browser } from '$app/environment';
	import { firefoxDesktopUrl } from '$lib/firefox-desktop-url';

	let isFirefoxDesktop = true;
	if (browser) {
		// See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent/Firefox.
		const userAgent = navigator.userAgent.toLowerCase();
		isFirefoxDesktop = userAgent.includes('gecko/20100101') && userAgent.includes('firefox');
	}
</script>

{#if !isFirefoxDesktop}
	<div id="not-firefox-warning" class="hidden sm:block">
		<a
			href={firefoxDesktopUrl}
			target="_blank"
			title="If you need to render large images with small cell sizes, Firefox for Desktop is faster than other browsers in our tests"
			class="btn-ghost btn flex items-center gap-2 normal-case"
		>
			<img class="h-5 w-5" src="/fox.svg" alt="Fox emoji" />
			This app works best on Firefox
		</a>
	</div>
{/if}
