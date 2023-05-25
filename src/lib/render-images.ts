import type { Image } from '$lib/image';
import { renderImage } from '$lib/render-image';
import type { RenderOptions } from '$lib/render-options';
import pLimit from 'p-limit';

const limit = pLimit(4);

export const renderImages = async (
	inputImages: Image[],
	renderOptions?: RenderOptions
): Promise<Image[]> => {
	return (
		await Promise.allSettled(
			inputImages.map((image) => limit(() => renderImage(image, renderOptions)))
		)
	).flatMap((result) => (result.status === 'fulfilled' ? result.value : []));
};
