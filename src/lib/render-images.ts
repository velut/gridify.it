import { addGridToCanvas } from '$lib/add-grid-to-canvas';
import { canvasToImage } from '$lib/canvas-to-image';
import { fileToImage } from '$lib/file-to-image';
import type { Image } from '$lib/image';
import { newCanvas } from '$lib/new-canvas';
import type { RenderOptions } from '$lib/render-options';
import { scaleCanvas } from '$lib/scale-canvas';
import { setCanvasFullAlpha } from '$lib/set-canvas-full-alpha';
import pLimit from 'p-limit';

const limit = pLimit(4);

const skipRenderImage = (renderOptions?: RenderOptions): renderOptions is undefined => {
	if (!renderOptions) {
		return true;
	}

	const { grid, cell, pixel } = renderOptions;

	// Default render options (render is the same as the original image).
	return grid.type === 'none' && cell.scale === 1 && cell.radius === 0 && !pixel.fullyOpaque;
};

const renderImage = async (inputImage: Image, renderOptions?: RenderOptions): Promise<Image> => {
	if (skipRenderImage(renderOptions)) {
		return fileToImage(inputImage.file);
	}

	const canvas = await newCanvas(inputImage);
	const { grid, cell, pixel } = renderOptions;

	if (pixel.fullyOpaque) {
		setCanvasFullAlpha(canvas);
	}

	// Just scale if necessary.
	if (grid.type === 'none' && cell.scale >= 1 && cell.radius === 0) {
		return canvasToImage(scaleCanvas(canvas, cell.scale), inputImage);
	}

	// Render grid.
	return canvasToImage(addGridToCanvas(canvas, { grid, cell }), inputImage);
};

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
