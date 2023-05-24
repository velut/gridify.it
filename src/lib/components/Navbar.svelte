<script lang="ts">
	import { projectName } from '$lib/metadata';
</script>

<div class="navbar bg-base-200">
	<a
		href="/"
		title="Homepage"
		class="btn-ghost btn flex items-center gap-2 text-lg font-bold normal-case"
	>
		<img class="h-5 w-5" src="/favicon.svg" alt="{projectName} logo, a chequered flag" />
		{projectName}
	</a>

	<div class="divider divider-horizontal" />

	<a
		href="/faq"
		title="Frequently Asked Questions"
		class="btn-ghost btn flex items-center gap-2 text-lg"
	>
		<img class="h-5 w-5" src="/faq.svg" alt="Open book emoji" />
		FAQ
	</a>

	<div class="divider divider-horizontal" />
</div>
