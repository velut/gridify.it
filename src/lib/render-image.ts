import { canvasToImage } from '$lib/canvas-to-image';
import { canvasWithFullAlpha } from '$lib/canvas-with-full-alpha';
import { canvasWithGrid } from '$lib/canvas-with-grid';
import { canvasWithScale } from '$lib/canvas-with-scale';
import { fileToImage } from '$lib/file-to-image';
import type { Image } from '$lib/image';
import { newCanvas } from '$lib/new-canvas';
import type { RenderOptions } from '$lib/render-options';

const skipRender = ({ grid, cell, pixel }: RenderOptions) => {
	// Default render options (render is the same as the original image).
	return grid.type === 'none' && cell.scale === 1 && cell.radius === 0 && !pixel.fullyOpaque;
};

export const renderImage = async (
	inputImage: Image,
	renderOptions?: RenderOptions
): Promise<Image> => {
	if (!renderOptions || skipRender(renderOptions)) {
		return fileToImage(inputImage.file);
	}

	const { grid, cell, pixel } = renderOptions;

	let canvas = await newCanvas(inputImage);
	if (pixel.fullyOpaque) {
		canvas = canvasWithFullAlpha(canvas);
	}
	if (cell.scale > 1 && grid.type === 'none' && cell.radius === 0) {
		canvas = canvasWithScale(canvas, cell.scale);
	}
	if (grid.type !== 'none' || cell.radius > 0) {
		canvas = canvasWithGrid(canvas, { grid, cell });
	}

	return canvasToImage(canvas, inputImage);
};
