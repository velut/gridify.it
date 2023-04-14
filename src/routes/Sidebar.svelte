<script lang="ts">
	import DownloadButton from './DownloadButton.svelte';
	import FileInput from './FileInput.svelte';
	import RenderOptionsForm from './RenderOptionsForm.svelte';
</script>

<div class="card card-compact w-full bg-base-300 shadow md:w-1/2 lg:w-96">
	<div class="card-body gap-4">
		<FileInput />
		<RenderOptionsForm />
		<DownloadButton />
	</div>
</div>
