<script lang="ts">
	import { outputImages, outputImagesState } from '$lib/stores';
	import { downloadZip } from 'client-zip';
	import fileSaver from 'file-saver';

	const { saveAs } = fileSaver;

	let { isLoaded } = $derived($outputImagesState);
	let images = $derived($outputImages);
	let disabled = $derived(!isLoaded || images.length === 0);

	const downloadImages = async () => {
		const archive = await downloadZip(images.map((image) => image.file)).blob();
		saveAs(archive, 'gridify_it_images.zip');
	};
</script>

<button
	title="Click to download all images"
	class="btn btn-outline w-full"
	onclick={downloadImages}
	{disabled}>Download Images</button
>
