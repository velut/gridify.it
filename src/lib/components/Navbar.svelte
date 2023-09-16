<script lang="ts">
	import { projectName } from '$lib/metadata';
	import IconChequeredFlag from '~icons/twemoji/chequered-flag';
	import IconMemo from '~icons/twemoji/memo';
</script>

<div class="navbar overflow-x-auto bg-base-200">
	<a href="/" title="Homepage" class="btn btn-ghost text-xl font-bold normal-case">
		<IconChequeredFlag class="h-6 w-6" />
		{projectName}
	</a>

	<div class="divider divider-horizontal" />

	<a href="/faq/" title="Frequently Asked Questions" class="btn btn-ghost text-lg">
		<IconMemo class="h-6 w-6" />
		FAQ
	</a>

	<div class="divider divider-horizontal" />
</div>
