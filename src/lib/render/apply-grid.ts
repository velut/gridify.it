import type { Dimensions, GridOpts } from '$lib/types';

export function applyGrid(canvas: OffscreenCanvas, grid: GridOpts): OffscreenCanvas {
	// Nothing to do.
	if (grid.type === 'none') return canvas;
	if (grid.type === 'invisible' && grid.cell.scale === 1 && grid.cell.cornerRadius === 0) {
		return canvas;
	}

	// Use faster canvas scaling since other grid features are not enabled.
	if (grid.type === 'invisible' && grid.cell.scale > 1 && grid.cell.cornerRadius === 0) {
		return applyScale(canvas, grid.cell.scale);
	}

	// Create the canvas to hold the image with the grid.
	const [gridCanvasWidth, gridCanvasHeight] = gridCanvasDimensions(canvas, grid);
	const gridCanvas = new OffscreenCanvas(gridCanvasWidth, gridCanvasHeight);
	const gridCtx = gridCanvas.getContext('2d')!;
	gridCtx.imageSmoothingEnabled = false;

	// Compute grid parts dimensions.
	const [srcCellWidth, srcCellHeight] = srcCellDimensions(canvas, grid);
	const [dstCellWidth, dstCellHeight] = dstCellDimensions([srcCellWidth, srcCellHeight], grid);
	const [lineSize, borderSize] = gridLineAndBorderSizes(grid);

	// Create cell corners mask.
	const cornersMask = cellCornersMask([dstCellWidth, dstCellHeight], grid);

	// Fill canvas with grid color.
	gridCtx.fillStyle = grid.color;
	gridCtx.fillRect(0, 0, gridCanvas.width, gridCanvas.height);

	// Cut the input image into source cell sized pieces and paste them on the grid canvas.
	for (let sy = 0; sy < canvas.height; sy += srcCellHeight) {
		for (let sx = 0; sx < canvas.width; sx += srcCellWidth) {
			// (sx, sy) are the top left corner coordinates of a source cell on the input canvas.
			// (dx, dy) are the top left corner coordinates of a destination cell on the grid canvas.
			// (dx, dy) = (cell index) * (full destination cell size) + border size.
			const dx = (sx / srcCellWidth) * (dstCellWidth + lineSize) + borderSize;
			const dy = (sy / srcCellHeight) * (dstCellHeight + lineSize) + borderSize;

			// Clear the grid space where the destination cell will be
			// to preserve transparent pixels.
			gridCtx.clearRect(dx, dy, dstCellWidth, dstCellHeight);

			// Transfer source cell to destination cell.
			gridCtx.drawImage(
				canvas,
				sx,
				sy,
				srcCellWidth,
				srcCellHeight,
				dx,
				dy,
				dstCellWidth,
				dstCellHeight
			);

			// Apply round corners mask to the destination cell.
			if (cornersMask) gridCtx.drawImage(cornersMask, dx, dy);
		}
	}

	return gridCanvas;
}

function applyScale(canvas: OffscreenCanvas, scale: number): OffscreenCanvas {
	const scaledCanvas = new OffscreenCanvas(scale * canvas.width, scale * canvas.height);
	const ctx = scaledCanvas.getContext('2d')!;
	ctx.imageSmoothingEnabled = false;
	ctx.scale(scale, scale);
	ctx.drawImage(canvas, 0, 0);
	return scaledCanvas;
}

function gridCanvasDimensions(canvas: OffscreenCanvas, grid: GridOpts): Dimensions {
	const [imageWidth, imageHeight] = gridImageDimensions(canvas, grid.cell.scale);
	const [borderWidth, borderHeight] = gridBorderDimensions(grid);
	const [linesWidth, linesHeight] = gridLinesDimensions(canvas, grid);
	const width = imageWidth + borderWidth + linesWidth;
	const height = imageHeight + borderHeight + linesHeight;
	return [width, height];
}

function gridImageDimensions(canvas: OffscreenCanvas, scale: number): Dimensions {
	const width = scale * canvas.width;
	const height = scale * canvas.height;
	return [width, height];
}

function gridBorderDimensions(grid: GridOpts): Dimensions {
	switch (grid.type) {
		case 'none':
		case 'lines':
		case 'invisible':
			return [0, 0];
		case 'border':
		case 'full':
			// Top and bottom, left and right borders.
			const size = 2 * grid.lines.size;
			return [size, size];
	}
}

function gridLinesDimensions(canvas: OffscreenCanvas, grid: GridOpts): Dimensions {
	switch (grid.type) {
		case 'none':
		case 'border':
		case 'invisible':
			return [0, 0];
		case 'lines':
		case 'full':
			const width = gridLinesCount(canvas.width, grid.cell.width) * grid.lines.size;
			const height = gridLinesCount(canvas.height, grid.cell.height) * grid.lines.size;
			return [width, height];
	}
}

function gridLinesCount(imageSize: number, cellSize: number): number {
	// Number of grid lines between cells (subtract 1 if exact partitioning).
	// Example: Grids with fixed size equal to 5 and cell size increasing from 1 to 6.
	// Grid layout; Image size / Cell size; Image size % Cell size; Number of lines;
	// a|a|a|a|a  ; 5; 0; 4 lines;
	// aa|aa|a    ; 2; 1; 2 lines;
	// aaa|aa     ; 1; 2; 1 line;
	// aaaa|a     ; 1; 1; 1 line;
	// aaaaa(|)   ; 1; 0; 0 lines;
	// aaaaa (|)  ; 0; 5; 0 lines;
	return Math.floor(imageSize / cellSize) - Number(imageSize % cellSize === 0);
}

function srcCellDimensions(canvas: OffscreenCanvas, grid: GridOpts): Dimensions {
	// Rounding corners always requires source cells to be created.
	if (grid.cell.cornerRadius > 0) return [grid.cell.width, grid.cell.height];
	switch (grid.type) {
		case 'none':
		case 'border':
		case 'invisible':
			// No need to create source cells as there are no grid lines.
			// Just use one cell for the whole canvas.
			return [canvas.width, canvas.height];
		case 'lines':
		case 'full':
			// Create source cells.
			return [grid.cell.width, grid.cell.height];
	}
}

function dstCellDimensions([scrCellWidth, srcCellHeight]: Dimensions, grid: GridOpts): Dimensions {
	const scale = grid.cell.scale;
	return [scale * scrCellWidth, scale * srcCellHeight];
}

function gridLineAndBorderSizes(grid: GridOpts): Dimensions {
	// Tuple is [line, border] stroke sizes.
	switch (grid.type) {
		case 'none':
		case 'invisible':
			return [0, 0];
		case 'border':
			return [0, grid.lines.size];
		case 'lines':
			return [grid.lines.size, 0];
		case 'full':
			return [grid.lines.size, grid.lines.size];
	}
}

function cellCornersMask(
	[dstCellWidth, dstCellHeight]: Dimensions,
	grid: GridOpts
): OffscreenCanvas | undefined {
	// Nothing to do.
	if (grid.cell.cornerRadius === 0) return undefined;

	// Create mask canvas.
	const canvas = new OffscreenCanvas(dstCellWidth, dstCellHeight);
	const ctx = canvas.getContext('2d')!;
	ctx.imageSmoothingEnabled = false;

	// Paint whole canvas with grid color.
	ctx.fillStyle = grid.color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Clip with rounded rectangle.
	ctx.beginPath();
	ctx.roundRect(0, 0, canvas.width, canvas.height, grid.cell.cornerRadius);
	ctx.clip();

	// Clear canvas to keep only the color in the corners outside of the clipped rectangle.
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	return canvas;
}
