import { cloneImages } from '$lib/utils/clone-images';
import type { Image, RenderOptions, RenderOptionsGrid } from '$lib/types';
import pMap, { pMapSkip } from 'p-map';

export async function renderImages(images: Image[], opts: RenderOptions): Promise<Image[]> {
	if (skipRender(opts)) return cloneImages(images);
	return await pMap(
		images,
		async (image) => {
			try {
				return await renderImage(image, opts);
			} catch {
				return pMapSkip;
			}
		},
		{ concurrency: 4 }
	);
}

function skipRender({ grid, opacity }: RenderOptions): boolean {
	// With these options the image is not modified.
	return (
		grid.type === 'none' &&
		grid.cell.scale === 1 &&
		grid.cell.cornerRadius === 0 &&
		opacity === 'preserve'
	);
}

async function renderImage(image: Image, { grid, opacity }: RenderOptions): Promise<Image> {
	let canvas = await imageToCanvas(image);
	if (opacity === 'opaque') {
		canvas = opacify(canvas);
	}
	if (grid.cell.scale > 1 && grid.type === 'none' && grid.cell.cornerRadius === 0) {
		// Can use faster canvas scaling since other grid features are not needed.
		canvas = scale(canvas, grid.cell.scale);
	}
	if (grid.type !== 'none' || grid.cell.cornerRadius > 0) {
		canvas = gridify(canvas, grid);
	}
	return await canvasToImage(canvas, image);
}

async function imageToCanvas(image: Image): Promise<HTMLCanvasElement> {
	const img = await loadImage(image);
	const [canvas, ctx] = createCanvas(img.width, img.height);
	ctx.drawImage(img, 0, 0);
	return canvas;
}

async function loadImage(image: Image): Promise<HTMLImageElement> {
	const img = document.createElement('img');
	img.src = image.url;
	await img.decode();
	return img;
}

function createCanvas(
	width: number,
	height: number
): [HTMLCanvasElement, CanvasRenderingContext2D] {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d')!;
	canvas.width = width;
	canvas.height = height;
	ctx.imageSmoothingEnabled = false; // Disable smoothing for pixel art.
	return [canvas, ctx];
}

function opacify(canvas: HTMLCanvasElement): HTMLCanvasElement {
	const ctx = canvas.getContext('2d')!;

	// NOTE: Browsers don't return the exact original pixel colors.
	// See https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-getimagedata.
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const pixels = imageData.data;

	// Set each pixel to full alpha.
	// See https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas.
	for (let i = 0; i < pixels.length; i += 4) {
		pixels[i + 3] = 255;
	}

	// Replace original data with updated data.
	ctx.putImageData(imageData, 0, 0);

	// Copy the image to a new canvas to prevent slower software rendering caused by `getImageData`.
	const [opaqueCanvas, opaqueCtx] = createCanvas(canvas.width, canvas.height);
	opaqueCtx.drawImage(canvas, 0, 0);
	return opaqueCanvas;
}

function scale(canvas: HTMLCanvasElement, scale: number): HTMLCanvasElement {
	const [scaledCanvas, scaledCtx] = createCanvas(scale * canvas.width, scale * canvas.height);
	scaledCtx.scale(scale, scale);
	scaledCtx.drawImage(canvas, 0, 0);
	return scaledCanvas;
}

function gridify(canvas: HTMLCanvasElement, grid: RenderOptionsGrid): HTMLCanvasElement {
	const [gridCanvas, gridCtx] = createCanvas(...gridCanvasDimensions(canvas, grid));
	const [srcCellWidth, srcCellHeight] = srcCellDimensions(canvas, grid);
	const [dstCellWidth, dstCellHeight] = dstCellDimensions(canvas, grid);
	const [lineSize, borderSize] = gridLineAndBorderSizes(grid);
	const cornersCanvas = roundCorners(dstCellWidth, dstCellHeight, grid);

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

			if (cornersCanvas) {
				// Paste the rounded corners clipping on the destination cell.
				gridCtx.drawImage(cornersCanvas, dx, dy);
			}
		}
	}

	return gridCanvas;
}

function gridCanvasDimensions(
	canvas: HTMLCanvasElement,
	grid: RenderOptionsGrid
): [number, number] {
	const [imageWidth, imageHeight] = gridImageDimensions(canvas, grid.cell.scale);
	const [borderWidth, borderHeight] = gridBorderDimensions(grid);
	const [linesWidth, linesHeight] = gridLinesDimensions(canvas, grid);
	const width = imageWidth + borderWidth + linesWidth;
	const height = imageHeight + borderHeight + linesHeight;
	return [width, height];
}

function gridImageDimensions(canvas: HTMLCanvasElement, scale: number): [number, number] {
	const width = scale * canvas.width;
	const height = scale * canvas.height;
	return [width, height];
}

function gridBorderDimensions(grid: RenderOptionsGrid): [number, number] {
	switch (grid.type) {
		case 'none':
		case 'lines':
			return [0, 0];
		case 'border':
		case 'full':
			// Top and bottom, left and right borders.
			const size = 2 * grid.lines.size;
			return [size, size];
	}
}

function gridLinesDimensions(canvas: HTMLCanvasElement, grid: RenderOptionsGrid): [number, number] {
	switch (grid.type) {
		case 'none':
		case 'border':
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

function srcCellDimensions(canvas: HTMLCanvasElement, grid: RenderOptionsGrid): [number, number] {
	// Rounding corners always requires source cells to be created.
	if (grid.cell.cornerRadius > 0) return [grid.cell.width, grid.cell.height];
	switch (grid.type) {
		case 'none':
		case 'border':
			// No need to create source cells as there is no grid; just use one cell for the canvas.
			return [canvas.width, canvas.height];
		case 'lines':
		case 'full':
			// Create source cells.
			return [grid.cell.width, grid.cell.height];
	}
}

function dstCellDimensions(canvas: HTMLCanvasElement, grid: RenderOptionsGrid): [number, number] {
	return srcCellDimensions(canvas, grid).map((size) => size * grid.cell.scale) as [number, number];
}

function gridLineAndBorderSizes(grid: RenderOptionsGrid): [number, number] {
	// Pair is [line, border] stroke sizes.
	switch (grid.type) {
		case 'none':
			return [0, 0];
		case 'border':
			return [0, grid.lines.size];
		case 'lines':
			return [grid.lines.size, 0];
		case 'full':
			return [grid.lines.size, grid.lines.size];
	}
}

function roundCorners(
	width: number,
	height: number,
	grid: RenderOptionsGrid
): HTMLCanvasElement | undefined {
	if (grid.cell.cornerRadius === 0) return undefined;

	// Paint whole canvas with grid color.
	const [canvas, ctx] = createCanvas(width, height);
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

async function canvasToImage(canvas: HTMLCanvasElement, image: Image): Promise<Image> {
	const blob = await canvasToBlob(canvas);
	const file = new File([blob], pngFilename(image.file.name), {
		type: 'image/png',
		lastModified: image.file.lastModified
	});
	return { file, url: URL.createObjectURL(file) };
}

async function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
	return new Promise((resolve, reject) => {
		canvas.toBlob(
			(blob) => {
				if (blob) {
					resolve(blob);
				} else {
					reject('cannot write canvas to blob');
				}
			},
			'image/png',
			1.0
		);
	});
}

function pngFilename(name: string): string {
	if (!name.includes('.')) return `${name}.png`;
	return `${name.split('.').slice(0, -1).join('.')}.png`;
}
