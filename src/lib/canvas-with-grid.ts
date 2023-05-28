import { canvasWithRoundCornersClipping } from '$lib/canvas-with-round-corners-clipping';
import type { RenderOptions } from '$lib/render-options';

type RenderOptionsGridAndCell = Pick<RenderOptions, 'grid' | 'cell'>;
type RenderOptionsGrid = Pick<RenderOptions, 'grid'>;
type RenderOptionsCell = Pick<RenderOptions, 'cell'>;

const gridStrokeSizes = ({ grid }: RenderOptionsGrid) => {
	// Determine stroke sizes in pixels for grid inner lines and outer border.
	const strokeSize = grid.stroke.size;
	const gridInnerStrokeSize = ['inner', 'full'].includes(grid.type) ? strokeSize : 0;
	const gridOuterStrokeSize = ['outer', 'full'].includes(grid.type) ? strokeSize : 0;
	return { gridInnerStrokeSize, gridOuterStrokeSize };
};

const srcCellDimensions = ({ cell }: RenderOptionsCell) => {
	// Determine dimensions of source cells that partition the input image.
	const srcCellWidth = cell.width;
	const srcCellHeight = cell.squareAspectRatio ? cell.width : cell.height;
	return { srcCellWidth, srcCellHeight };
};

const dstCellDimensions = ({ grid, cell }: RenderOptionsGridAndCell) => {
	// Determine dimensions of destination cells that form the output image.
	const { srcCellWidth, srcCellHeight } = srcCellDimensions({ cell });
	const { gridInnerStrokeSize } = gridStrokeSizes({ grid });
	const dstCellWidth = cell.scale * srcCellWidth;
	const dstCellHeight = cell.scale * srcCellHeight;
	const dstCellAndInnerLineWidth = dstCellWidth + gridInnerStrokeSize;
	const dstCellAndInnerLineHeight = dstCellHeight + gridInnerStrokeSize;
	return { dstCellWidth, dstCellHeight, dstCellAndInnerLineWidth, dstCellAndInnerLineHeight };
};

const outputImageDimensions = (canvas: HTMLCanvasElement, { cell }: RenderOptionsCell) => {
	// Determine dimensions of possibly scaled output image.
	const outputImageWidth = cell.scale * canvas.width;
	const outputImageHeight = cell.scale * canvas.height;
	return { outputImageWidth, outputImageHeight };
};

const gridInnerLinesDimensions = (
	canvas: HTMLCanvasElement,
	{ grid, cell }: RenderOptionsGridAndCell
) => {
	// Determine dimensions taken by grid inner lines.
	//
	// Example:
	// Grids with fixed width equal to 5 and source cell size increasing from 1 to 6.
	// Source cells and lines layout; Image width / Source cell size; Image width % Source cell size;
	// a|a|a|a|a; 5; 0;
	// aa|aa|a  ; 2; 1;
	// aaa|aa   ; 1; 2;
	// aaaa|a   ; 1; 1;
	// aaaaa|   ; 1; 0;
	// aaaaa |  ; 0; 5;
	//
	const { srcCellWidth, srcCellHeight } = srcCellDimensions({ cell });
	const { gridInnerStrokeSize } = gridStrokeSizes({ grid });

	// Determine number of source cells that partition the image.
	const numSrcCellsX = Math.floor(canvas.width / srcCellWidth);
	const numSrcCellsY = Math.floor(canvas.height / srcCellHeight);

	// Check if the source cells partitioning is exact.
	const isExactPartitionX = canvas.width % srcCellWidth === 0;
	const isExactPartitionY = canvas.height % srcCellHeight === 0;

	// Determine number of grid lines between cells (subtract 1 if exact partitioning).
	const numGridInnerLinesX = numSrcCellsX - (isExactPartitionX ? 1 : 0);
	const numGridInnerLinesY = numSrcCellsY - (isExactPartitionY ? 1 : 0);

	// Determine dimensions for inner grid lines.
	const gridInnerLinesWidth = numGridInnerLinesX * gridInnerStrokeSize;
	const gridInnerLinesHeight = numGridInnerLinesY * gridInnerStrokeSize;
	return { gridInnerLinesWidth, gridInnerLinesHeight };
};

const gridOuterBorderDimensions = ({ grid }: RenderOptionsGrid) => {
	// Determine dimensions taken by grid outer border.
	const { gridOuterStrokeSize } = gridStrokeSizes({ grid });
	const gridOuterBorderWidth = 2 * gridOuterStrokeSize;
	const gridOuterBorderHeight = 2 * gridOuterStrokeSize;
	return { gridOuterBorderWidth, gridOuterBorderHeight };
};

const gridCanvasDimensions = (
	canvas: HTMLCanvasElement,
	{ grid, cell }: Pick<RenderOptions, 'grid' | 'cell'>
) => {
	// Determine dimensions for grid canvas.
	const { outputImageWidth, outputImageHeight } = outputImageDimensions(canvas, { cell });
	const { gridInnerLinesWidth, gridInnerLinesHeight } = gridInnerLinesDimensions(canvas, {
		grid,
		cell
	});
	const { gridOuterBorderWidth, gridOuterBorderHeight } = gridOuterBorderDimensions({ grid });
	const gridCanvasWidth = outputImageWidth + gridInnerLinesWidth + gridOuterBorderWidth;
	const gridCanvasHeight = outputImageHeight + gridInnerLinesHeight + gridOuterBorderHeight;
	return { gridCanvasWidth, gridCanvasHeight };
};

export const canvasWithGrid = (
	canvas: HTMLCanvasElement,
	{ grid, cell }: Pick<RenderOptions, 'grid' | 'cell'>
) => {
	const gridCanvas = document.createElement('canvas');
	const gridContext = gridCanvas.getContext('2d')!;

	// Resize canvas to fit output image, grid lines and grid borders; disable smoothing.
	const { gridCanvasWidth, gridCanvasHeight } = gridCanvasDimensions(canvas, { grid, cell });
	gridCanvas.width = gridCanvasWidth;
	gridCanvas.height = gridCanvasHeight;
	gridContext.imageSmoothingEnabled = false;

	// Fill canvas with grid color.
	gridContext.fillStyle = grid.stroke.color;
	gridContext.fillRect(0, 0, gridCanvas.width, gridCanvas.height);

	// Determine grid stroke sizes.
	const { gridOuterStrokeSize } = gridStrokeSizes({ grid });

	// Determine source and destination cell dimensions.
	const { srcCellWidth, srcCellHeight } = srcCellDimensions({ cell });
	const { dstCellWidth, dstCellHeight, dstCellAndInnerLineWidth, dstCellAndInnerLineHeight } =
		dstCellDimensions({ grid, cell });

	// Create round corners clipping canvas.
	const roundCornersClipCanvas =
		cell.radius > 0
			? canvasWithRoundCornersClipping(dstCellWidth, dstCellHeight, { grid, cell })
			: undefined;

	// Transfer input image one source cell at a time to grid canvas.
	for (let sy = 0; sy < canvas.height; sy += srcCellHeight) {
		const indexCellY = sy / srcCellHeight;
		const dy = indexCellY * dstCellAndInnerLineHeight + gridOuterStrokeSize;

		for (let sx = 0; sx < canvas.width; sx += srcCellWidth) {
			// Current cell indexes (see also above).
			const indexCellX = sx / srcCellWidth;

			// Top left corner coordinates of a destination cell on grid canvas.
			const dx = indexCellX * dstCellAndInnerLineWidth + gridOuterStrokeSize;

			// Transfer source cell to destination cell.
			gridContext.drawImage(
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

			// If rounded corners are enabled, paste the rounded corners clipping on the destination cell.
			if (cell.radius > 0 && roundCornersClipCanvas) {
				gridContext.drawImage(roundCornersClipCanvas, dx, dy);
			}
		}
	}

	return gridCanvas;
};
