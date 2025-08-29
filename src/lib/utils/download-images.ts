import type { Image } from '$lib/types';
import { downloadBlob } from '$lib/utils/download-blob';
import { zipImages } from '$lib/utils/zip-images';

export async function downloadImages(images: Image[]) {
	if (!images.length) return;
	if (images.length === 1) {
		const image = images[0];
		downloadBlob(image.file, image.file.name);
	} else {
		downloadBlob(await zipImages(images), 'gridify-it-images.zip');
	}
}
