import { addGridToCanvas } from '$lib/add-grid-to-canvas';
import { canvasToImage } from '$lib/canvas-to-image';
import { fileToImage } from '$lib/file-to-image';
import type { Image } from '$lib/image';
import { newCanvas } from '$lib/new-canvas';
import type { RenderOptions } from '$lib/render-options';
import { scaleCanvas } from '$lib/scale-canvas';
import { setCanvasFullAlpha } from '$lib/set-canvas-full-alpha';

const skipRenderImage = (renderOptions?: RenderOptions): renderOptions is undefined => {
	if (!renderOptions) {
		return true;
	}

	const { grid, cell, pixel } = renderOptions;

	// Default render options (render is the same as the original image).
	return grid.type === 'none' && cell.scale === 1 && cell.radius === 0 && !pixel.fullyOpaque;
};

export const renderImage = async (
	inputImage: Image,
	renderOptions?: RenderOptions
): Promise<Image> => {
	if (skipRenderImage(renderOptions)) {
		return fileToImage(inputImage.file);
	}

	let canvas = await newCanvas(inputImage);
	const { grid, cell, pixel } = renderOptions;

	if (pixel.fullyOpaque) {
		canvas = setCanvasFullAlpha(canvas);
	}

	const isOnlyScale = cell.scale >= 1 && grid.type === 'none' && cell.radius === 0;
	if (isOnlyScale) {
		return canvasToImage(scaleCanvas(canvas, cell.scale), inputImage);
	}

	// Render grid.
	return canvasToImage(addGridToCanvas(canvas, { grid, cell }), inputImage);
};
