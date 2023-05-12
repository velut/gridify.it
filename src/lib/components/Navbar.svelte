<script lang="ts">
	import { projectName } from '$lib/metadata';
</script>

<div class="navbar bg-base-200">
	<a href="/" class="btn-ghost btn flex items-center gap-2 text-xl normal-case">
		<img class="h-6 w-6" src="./favicon.svg" alt={`${projectName} logo`} />
		{projectName}
	</a>
</div>
