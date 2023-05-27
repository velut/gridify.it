import type { RenderOptions } from '$lib/render-options';

// Example grids with width equal to 5 and cell sizes increasing from 1 to 6.
// Cells and lines layout; Width / Cell size; Width % Cell size;
// a|a|a|a|a   5 0
// aa|aa|a     2 1
// aaa|aa      1 2
// aaaa|a      1 1
// aaaaa|      1 0
// aaaaa |     0 5

export const canvasWithGrid = (
	canvas: HTMLCanvasElement,
	{ grid, cell }: Pick<RenderOptions, 'grid' | 'cell'>
) => {
	const gridCanvas = document.createElement('canvas');
	const gridContext = gridCanvas.getContext('2d')!;

	// Determine stroke sizes for grid.
	const strokeSize = grid.stroke.size;
	const innerStrokeSize = ['inner', 'full'].includes(grid.type) ? strokeSize : 0;
	const outerStrokeSize = ['outer', 'full'].includes(grid.type) ? strokeSize : 0;

	// Determine dimensions of possibly scaled image.
	const scaledImageWidth = cell.scale * canvas.width;
	const scaledImageHeight = cell.scale * canvas.height;

	// Determine source cell dimensions.
	const cellWidth = cell.width;
	const cellHeight = cell.squareAspectRatio ? cell.width : cell.height;

	// Determine number of exactly cell-sized cells inside the grid.
	const numberCellsX = Math.floor(canvas.width / cellWidth);
	const numberCellsY = Math.floor(canvas.height / cellHeight);

	// Determine sizes of the smaller extra cells if cell size is not an exact divisor.
	const extraCellSizeX = canvas.width % cellWidth;
	const extraCellSizeY = canvas.height % cellHeight;

	// Determine number of grid lines between cells (subtract 1 if only exact cells).
	const numberInnerLinesX = numberCellsX - Number(!extraCellSizeX);
	const numberInnerLinesY = numberCellsY - Number(!extraCellSizeY);

	// Determine sizes for grid lines and borders.
	const innerLinesSizeX = numberInnerLinesX * innerStrokeSize;
	const innerLinesSizeY = numberInnerLinesY * innerStrokeSize;
	const outerBorderSize = 2 * outerStrokeSize;

	// Resize canvas to fit image, grid lines and grid borders; disable smoothing.
	gridCanvas.width = scaledImageWidth + innerLinesSizeX + outerBorderSize;
	gridCanvas.height = scaledImageHeight + innerLinesSizeY + outerBorderSize;
	gridContext.imageSmoothingEnabled = false;

	// Fill canvas with grid color.
	gridContext.fillStyle = grid.stroke.color;
	gridContext.fillRect(0, 0, gridCanvas.width, gridCanvas.height);

	// Determine destination cell dimensions.
	const dCellWidth = cell.scale * cellWidth;
	const dCellHeight = cell.scale * cellHeight;
	const dCellWidthAndStroke = dCellWidth + innerStrokeSize;
	const dCellHeightAndStroke = dCellHeight + innerStrokeSize;

	// Create canvas with rounded corners cutout.
	const roundCornersCanvas = document.createElement('canvas');
	const roundCornersContext = roundCornersCanvas.getContext('2d')!;
	if (cell.radius > 0) {
		// Resize to destination cell dimensions.
		roundCornersCanvas.width = dCellWidth;
		roundCornersCanvas.height = dCellHeight;

		// Paint whole canvas with grid color.
		roundCornersContext.fillStyle = grid.stroke.color;
		roundCornersContext.fillRect(0, 0, roundCornersCanvas.width, roundCornersCanvas.height);

		// Clip with rounded rectangle.
		roundCornersContext.beginPath();
		roundCornersContext.roundRect(0, 0, dCellWidth, dCellHeight, cell.radius);
		roundCornersContext.clip();

		// Clear canvas to keep only the color outside of the clipped rectangle.
		roundCornersContext.clearRect(0, 0, roundCornersCanvas.width, roundCornersCanvas.height);
	}

	// Transfer source image cells to grid canvas.
	for (let sy = 0; sy < canvas.height; sy += cellHeight) {
		const indexCellY = sy / cellHeight;
		const dy = indexCellY * dCellHeightAndStroke + outerStrokeSize;

		for (let sx = 0; sx < canvas.width; sx += cellWidth) {
			// Current cell indexes (see also above).
			const indexCellX = sx / cellWidth;

			// Top left corner coordinates of a destination cell on grid canvas.
			const dx = indexCellX * dCellWidthAndStroke + outerStrokeSize;

			// Transfer source cell to destination cell.
			gridContext.drawImage(canvas, sx, sy, cellWidth, cellHeight, dx, dy, dCellWidth, dCellHeight);

			// If rounded corners are enabled, paste the rounded corners cutout on the destination cell.
			if (cell.radius > 0) {
				gridContext.drawImage(roundCornersCanvas, dx, dy);
			}
		}
	}

	return gridCanvas;
};
