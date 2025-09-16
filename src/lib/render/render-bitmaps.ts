import type {
	GridOpts,
	AppImage,
	RenderOpts,
	RenderWorkerInput,
	AppImageBuffer,
	AppBitmap,
	PaletteOpts
} from '$lib/types';
import pMap, { pMapSkip } from 'p-map';

export async function renderBitmaps({
	bitmaps,
	opts
}: RenderWorkerInput): Promise<AppImageBuffer[]> {
	return await pMap(
		bitmaps,
		async ({ id, filename, bitmap }) => {
			try {
				const buffer = await renderBitmap(bitmap, opts);
				return { id, filename, buffer };
			} catch (err) {
				console.error(err);
				return pMapSkip;
			}
		},
		{ concurrency: 4 }
	);
}

async function renderBitmap(
	bitmap: ImageBitmap,
	{ palette, grid }: RenderOpts
): Promise<ArrayBuffer> {
	let canvas = bitmapToCanvas(bitmap);
	canvas = applyPalette(canvas, palette);
	// if (grid.cell.scale > 1 && grid.type === 'none' && grid.cell.cornerRadius === 0) {
	// 	// Can use faster canvas scaling since other grid features are not needed.
	// 	canvas = scale(canvas, grid.cell.scale);
	// }
	// if (grid.type !== 'none' || grid.cell.cornerRadius > 0) {
	// 	canvas = gridify(canvas, grid);
	// }
	return await canvasToBuffer(canvas);
}

function bitmapToCanvas(bitmap: ImageBitmap): OffscreenCanvas {
	// Transfer bitmap to canvas.
	const bitmapCanvas = new OffscreenCanvas(bitmap.width, bitmap.height);
	bitmapCanvas.getContext('bitmaprenderer')!.transferFromImageBitmap(bitmap);

	// Copy bitmap canvas to 2d canvas as a canvas cannot have multiple contexts.
	const canvas = new OffscreenCanvas(bitmapCanvas.width, bitmapCanvas.height);
	const ctx = canvas.getContext('2d')!;
	ctx.imageSmoothingEnabled = false;
	ctx.drawImage(bitmapCanvas, 0, 0);
	return canvas;
}

function applyPalette(canvas: OffscreenCanvas, palette: PaletteOpts): OffscreenCanvas {
	// Nothing to do.
	if (palette.type === 'original') return canvas;

	// Copy canvas to a temporary canvas to prevent slower software rendering caused by `getImageData`.
	const tmpCanvas = new OffscreenCanvas(canvas.width, canvas.height);
	const tmpCtx = tmpCanvas.getContext('2d')!;
	tmpCtx.drawImage(canvas, 0, 0);

	// NOTE: Browsers don't return the exact original pixel colors.
	// See https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-getimagedata.
	const imageData = tmpCtx.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height, {
		colorSpace: 'srgb'
	});
	const pixels = imageData.data;

	// Apply palette.
	switch (palette.type) {
		case 'opaque':
			applyOpaquePalette(pixels);
			break;
		case 'invert':
			applyInvertPalette(pixels);
			break;
		case 'binary':
			applyBinaryPalette(pixels);
			break;
		case 'grayscale':
			applyGrayscalePalette(pixels);
			break;
	}

	// Replace original image data with updated data.
	tmpCtx.putImageData(imageData, 0, 0);

	// Copy back temporary canvas with new palette to original canvas.
	canvas.getContext('2d')!.drawImage(tmpCanvas, 0, 0);
	return canvas;
}

function applyOpaquePalette(pixels: ImageDataArray) {
	// Set each pixel to full alpha.
	// See https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas.
	for (let i = 0; i < pixels.length; i += 4) {
		pixels[i + 3] = 255;
	}
}

function applyInvertPalette(pixels: ImageDataArray) {
	for (let i = 0; i < pixels.length; i += 4) {
		pixels[i] = 255 - pixels[i];
		pixels[i + 1] = 255 - pixels[i + 1];
		pixels[i + 2] = 255 - pixels[i + 2];
		pixels[i + 3] = 255;
	}
}

function applyBinaryPalette(pixels: ImageDataArray) {
	for (let i = 0; i < pixels.length; i += 4) {
		const red = pixels[i];
		const green = pixels[i + 1];
		const blue = pixels[i + 2];
		const value = luma709(red, green, blue) < 128 ? 0 : 255;
		pixels[i] = value;
		pixels[i + 1] = value;
		pixels[i + 2] = value;
		pixels[i + 3] = 255;
	}
}

function applyGrayscalePalette(pixels: ImageDataArray) {
	for (let i = 0; i < pixels.length; i += 4) {
		const red = pixels[i];
		const green = pixels[i + 1];
		const blue = pixels[i + 2];
		const value = luma709(red, green, blue);
		pixels[i] = value;
		pixels[i + 1] = value;
		pixels[i + 2] = value;
		pixels[i + 3] = 255;
	}
}

function luma709(red: number, green: number, blue: number): number {
	// Compute luminance for a pixel with the Rec.709 standard:
	// luma709 = Math.round(0.2126 * red + 0.7152 * green + 0.0722 * blue)
	// See https://en.wikipedia.org/wiki/Luma_(video)
	// and https://www.dynamsoft.com/codepool/convert-image-to-black-white-with-javascript.html.
	return (6966 * red + 23436 * green + 2366 * blue) >> 15;
}

// function scale(canvas: OffscreenCanvas, scale: number): OffscreenCanvas {
// 	const [scaledCanvas, scaledCtx] = createCanvas(scale * canvas.width, scale * canvas.height);
// 	scaledCtx.scale(scale, scale);
// 	scaledCtx.drawImage(canvas, 0, 0);
// 	return scaledCanvas;
// }

// function gridify(canvas: OffscreenCanvas, grid: GridOpts): OffscreenCanvas {
// 	const [gridCanvas, gridCtx] = createCanvas(...gridCanvasDimensions(canvas, grid));
// 	const [srcCellWidth, srcCellHeight] = srcCellDimensions(canvas, grid);
// 	const [dstCellWidth, dstCellHeight] = dstCellDimensions(canvas, grid);
// 	const [lineSize, borderSize] = gridLineAndBorderSizes(grid);
// 	const cornersCanvas = roundCorners(dstCellWidth, dstCellHeight, grid);

// 	// Fill canvas with grid color.
// 	gridCtx.fillStyle = grid.color;
// 	gridCtx.fillRect(0, 0, gridCanvas.width, gridCanvas.height);

// 	// Cut the input image into source cell sized pieces and paste them on the grid canvas.
// 	for (let sy = 0; sy < canvas.height; sy += srcCellHeight) {
// 		for (let sx = 0; sx < canvas.width; sx += srcCellWidth) {
// 			// (sx, sy) are the top left corner coordinates of a source cell on the input canvas.
// 			// (dx, dy) are the top left corner coordinates of a destination cell on the grid canvas.
// 			// (dx, dy) = (cell index) * (full destination cell size) + border size.
// 			const dx = (sx / srcCellWidth) * (dstCellWidth + lineSize) + borderSize;
// 			const dy = (sy / srcCellHeight) * (dstCellHeight + lineSize) + borderSize;

// 			// Transfer source cell to destination cell.
// 			gridCtx.drawImage(
// 				canvas,
// 				sx,
// 				sy,
// 				srcCellWidth,
// 				srcCellHeight,
// 				dx,
// 				dy,
// 				dstCellWidth,
// 				dstCellHeight
// 			);

// 			if (cornersCanvas) {
// 				// Paste the rounded corners clipping on the destination cell.
// 				gridCtx.drawImage(cornersCanvas, dx, dy);
// 			}
// 		}
// 	}

// 	return gridCanvas;
// }

// function gridCanvasDimensions(canvas: OffscreenCanvas, grid: GridOpts): [number, number] {
// 	const [imageWidth, imageHeight] = gridImageDimensions(canvas, grid.cell.scale);
// 	const [borderWidth, borderHeight] = gridBorderDimensions(grid);
// 	const [linesWidth, linesHeight] = gridLinesDimensions(canvas, grid);
// 	const width = imageWidth + borderWidth + linesWidth;
// 	const height = imageHeight + borderHeight + linesHeight;
// 	return [width, height];
// }

// function gridImageDimensions(canvas: OffscreenCanvas, scale: number): [number, number] {
// 	const width = scale * canvas.width;
// 	const height = scale * canvas.height;
// 	return [width, height];
// }

// function gridBorderDimensions(grid: GridOpts): [number, number] {
// 	switch (grid.type) {
// 		case 'none':
// 		case 'lines':
// 			return [0, 0];
// 		case 'border':
// 		case 'full':
// 			// Top and bottom, left and right borders.
// 			const size = 2 * grid.lines.size;
// 			return [size, size];
// 	}
// }

// function gridLinesDimensions(canvas: OffscreenCanvas, grid: GridOpts): [number, number] {
// 	switch (grid.type) {
// 		case 'none':
// 		case 'border':
// 			return [0, 0];
// 		case 'lines':
// 		case 'full':
// 			const width = gridLinesCount(canvas.width, grid.cell.width) * grid.lines.size;
// 			const height = gridLinesCount(canvas.height, grid.cell.height) * grid.lines.size;
// 			return [width, height];
// 	}
// }

// function gridLinesCount(imageSize: number, cellSize: number): number {
// 	// Number of grid lines between cells (subtract 1 if exact partitioning).
// 	// Example: Grids with fixed size equal to 5 and cell size increasing from 1 to 6.
// 	// Grid layout; Image size / Cell size; Image size % Cell size; Number of lines;
// 	// a|a|a|a|a  ; 5; 0; 4 lines;
// 	// aa|aa|a    ; 2; 1; 2 lines;
// 	// aaa|aa     ; 1; 2; 1 line;
// 	// aaaa|a     ; 1; 1; 1 line;
// 	// aaaaa(|)   ; 1; 0; 0 lines;
// 	// aaaaa (|)  ; 0; 5; 0 lines;
// 	return Math.floor(imageSize / cellSize) - Number(imageSize % cellSize === 0);
// }

// function srcCellDimensions(canvas: OffscreenCanvas, grid: GridOpts): [number, number] {
// 	// Rounding corners always requires source cells to be created.
// 	if (grid.cell.cornerRadius > 0) return [grid.cell.width, grid.cell.height];
// 	switch (grid.type) {
// 		case 'none':
// 		case 'border':
// 			// No need to create source cells as there is no grid; just use one cell for the canvas.
// 			return [canvas.width, canvas.height];
// 		case 'lines':
// 		case 'full':
// 			// Create source cells.
// 			return [grid.cell.width, grid.cell.height];
// 	}
// }

// function dstCellDimensions(canvas: OffscreenCanvas, grid: GridOpts): [number, number] {
// 	return srcCellDimensions(canvas, grid).map((size) => size * grid.cell.scale) as [number, number];
// }

// function gridLineAndBorderSizes(grid: GridOpts): [number, number] {
// 	// Pair is [line, border] stroke sizes.
// 	switch (grid.type) {
// 		case 'none':
// 			return [0, 0];
// 		case 'border':
// 			return [0, grid.lines.size];
// 		case 'lines':
// 			return [grid.lines.size, 0];
// 		case 'full':
// 			return [grid.lines.size, grid.lines.size];
// 	}
// }

// function roundCorners(width: number, height: number, grid: GridOpts): OffscreenCanvas | undefined {
// 	if (grid.cell.cornerRadius === 0) return undefined;

// 	// Paint whole canvas with grid color.
// 	const [canvas, ctx] = createCanvas(width, height);
// 	ctx.fillStyle = grid.color;
// 	ctx.fillRect(0, 0, canvas.width, canvas.height);

// 	// Clip with rounded rectangle.
// 	ctx.beginPath();
// 	ctx.roundRect(0, 0, canvas.width, canvas.height, grid.cell.cornerRadius);
// 	ctx.clip();

// 	// Clear canvas to keep only the color in the corners outside of the clipped rectangle.
// 	ctx.clearRect(0, 0, canvas.width, canvas.height);

// 	return canvas;
// }

async function canvasToBuffer(canvas: OffscreenCanvas): Promise<ArrayBuffer> {
	const blob = await canvas.convertToBlob({ type: 'image/png', quality: 1 });
	return await blob.arrayBuffer();
}
