import { canvasToImage } from '$lib/canvas-to-image';
import { fileToImage } from '$lib/file-to-image';
import type { Image } from '$lib/image';
import { newCanvas } from '$lib/new-canvas';
import type { RenderOptions } from '$lib/render-options';
import { scaleCanvas } from '$lib/scale-canvas';
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

	if (grid.type === 'none' && cell.scale > 1 && cell.radius === 0) {
		canvas = scaleCanvas(canvas, cell.scale);
	}

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
