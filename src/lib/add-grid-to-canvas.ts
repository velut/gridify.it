import type { RenderOptions } from '$lib/render-options';

// Example grids with width equal to 5 and cell sizes increasing from 1 to 6.
// Cells and lines layout; Width / Cell size; Width % Cell size;
// a|a|a|a|a   5 0
// aa|aa|a     2 1
// aaa|aa      1 2
// aaaa|a      1 1
// aaaaa|      1 0
// aaaaa |     0 5

export const addGridToCanvas = (
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

	// If cells are rounded, set clipping mask.
	if (cell.radius > 0) {
		// Begin clipping path.
		// See https://stackoverflow.com/a/33625559/16109047.
		gridContext.beginPath();

		// Add cells clipping paths.
		for (let sy = 0; sy < canvas.height; sy += cellHeight) {
			for (let sx = 0; sx < canvas.width; sx += cellWidth) {
				// Current cell indexes.
				const indexCellX = sx / cellWidth;
				const indexCellY = sy / cellHeight;

				// Top left corner coordinates of a destination cell on grid canvas.
				const dx = indexCellX * (dCellWidth + innerStrokeSize) + outerStrokeSize;
				const dy = indexCellY * (dCellHeight + innerStrokeSize) + outerStrokeSize;

				// Add rounded rectangle to clipping path.
				gridContext.roundRect(dx, dy, dCellWidth, dCellHeight, cell.radius);
			}
		}

		// Finalize clipping path.
		gridContext.clip();
	}

	// Transfer source image cells to grid canvas.
	for (let sy = 0; sy < canvas.height; sy += cellHeight) {
		for (let sx = 0; sx < canvas.width; sx += cellWidth) {
			// Current cell indexes.
			const indexCellX = sx / cellWidth;
			const indexCellY = sy / cellHeight;

			// Top left corner coordinates of a destination cell on grid canvas.
			const dx = indexCellX * (dCellWidth + innerStrokeSize) + outerStrokeSize;
			const dy = indexCellY * (dCellHeight + innerStrokeSize) + outerStrokeSize;

			// Transfer source cell to destination cell.
			gridContext.drawImage(canvas, sx, sy, cellWidth, cellHeight, dx, dy, dCellWidth, dCellHeight);
		}
	}

	return gridCanvas;
};
