import { fileToImage } from '$lib/file-to-image';
import type { Image } from '$lib/image';
import type { RenderOptions } from '$lib/render-options';

export const renderImages = async (inputImages: Image[], renderOptions: RenderOptions | null) => {
	if (!renderOptions) {
		return inputImages.map((image) => fileToImage(image.file));
	}
	return [];
};
