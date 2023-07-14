<script lang="ts">
	import ChequeredFlagIcon from '$lib/components/ChequeredFlagIcon.svelte';
	import MemoIcon from '$lib/components/MemoIcon.svelte';
	import { projectName } from '$lib/metadata';
</script>

<div class="navbar overflow-x-auto bg-base-200">
	<a href="/" title="Homepage" class="btn btn-ghost text-xl font-bold normal-case">
		<ChequeredFlagIcon class="h-6 w-6" />
		{projectName}
	</a>

	<div class="divider divider-horizontal" />

	<a href="/faq/" title="Frequently Asked Questions" class="btn btn-ghost text-lg">
		<MemoIcon class="h-6 w-6" />
		FAQ
	</a>

	<div class="divider divider-horizontal" />
</div>
