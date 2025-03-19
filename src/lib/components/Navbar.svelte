<script lang="ts">
	import { projectName } from '$lib/metadata';
	import NotoChequeredFlag from '~icons/noto/chequered-flag';
	import NotoMemo from '~icons/noto/memo';
</script>

<div class="navbar bg-base-200 overflow-x-auto">
	<a href="/" title="Homepage" class="btn btn-ghost text-xl font-bold">
		<NotoChequeredFlag class="size-6 flex-none" />
		{projectName}
	</a>

	<div class="divider divider-horizontal"></div>

	<a href="/faq/" title="Frequently Asked Questions" class="btn btn-ghost text-lg">
		<NotoMemo class="size-6 flex-none" />
		FAQ
	</a>

	<div class="divider divider-horizontal"></div>
</div>
