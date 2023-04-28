import { addGridToCanvas } from '$lib/add-grid-to-canvas';
import { canvasToImage } from '$lib/canvas-to-image';
import { fileToImage } from '$lib/file-to-image';
import type { Image } from '$lib/image';
import { newCanvas } from '$lib/new-canvas';
import type { RenderOptions } from '$lib/render-options';
import { setCanvasFullAlpha } from '$lib/set-canvas-full-alpha';
import pLimit from 'p-limit';

const limit = pLimit(10);

const renderImage = async (
	inputImage: Image,
	{ grid, cell, pixel }: RenderOptions
): Promise<Image> => {
	let canvas = await newCanvas(inputImage.url);

	if (pixel.fullyOpaque) {
		canvas = setCanvasFullAlpha(canvas);
	}

	canvas = addGridToCanvas(canvas, { grid, cell });

	return canvasToImage(canvas, inputImage);
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
