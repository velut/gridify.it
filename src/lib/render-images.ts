import { fileToImage } from '$lib/file-to-image';
import type { Image } from '$lib/image';
import type { RenderOptions } from '$lib/render-options';
import pLimit from 'p-limit';

const limit = pLimit(10);

const renderImage = async (inputImage: Image, renderOptions: RenderOptions): Promise<Image> => {
	return fileToImage(inputImage.file);
};

export const renderImages = async (
	inputImages: Image[],
	renderOptions: RenderOptions | null
): Promise<Image[]> => {
	if (!renderOptions) {
		return inputImages.map((image) => fileToImage(image.file));
	}
	return (
		await Promise.allSettled(
			inputImages.map((image) => limit(() => renderImage(image, renderOptions)))
		)
	).flatMap((result) => (result.status === 'fulfilled' ? result.value : []));
};
