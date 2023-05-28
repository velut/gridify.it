import type { RenderOptions } from '$lib/render-options';

export const canvasWithRoundCornersClipping = (
	dstCellWidth: number,
	dstCellHeight: number,
	{ grid, cell }: Pick<RenderOptions, 'grid' | 'cell'>
) => {
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d')!;

	// Resize to destination cell dimensions.
	canvas.width = dstCellWidth;
	canvas.height = dstCellHeight;

	// Paint whole canvas with grid color.
	context.fillStyle = grid.stroke.color;
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Clip with rounded rectangle.
	context.beginPath();
	context.roundRect(0, 0, canvas.width, canvas.height, cell.radius);
	context.clip();

	// Clear canvas to keep only the color in the corners outside of the clipped rectangle.
	context.clearRect(0, 0, canvas.width, canvas.height);

	return canvas;
};
