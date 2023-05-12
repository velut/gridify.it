<script lang="ts">
	import { projectName } from '$lib/metadata';
	import { outputImages, outputImagesState } from '$lib/stores';
	import { downloadZip } from 'client-zip';
	import { saveAs } from 'file-saver';

	$: ({ isLoaded } = $outputImagesState);
	$: images = $outputImages;
	$: disabled = !isLoaded || images.length === 0;

	const downloadImages = async () => {
		const archive = await downloadZip(images.map((image) => image.file)).blob();
		saveAs(archive, `${projectName}_images.zip`);
	};
</script>

<button class="btn-outline btn w-full" on:click={downloadImages} {disabled}>Download Images</button>
