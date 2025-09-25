import { applyGrid } from '$lib/render/apply-grid';
import { applyPalette } from '$lib/render/apply-palette';
import type { AppImageBuffer, RenderWorkerInput } from '$lib/types';
import pMap, { pMapSkip } from 'p-map';

export async function renderBitmaps({
	bitmaps,
	opts
}: RenderWorkerInput): Promise<AppImageBuffer[]> {
	return await pMap(
		bitmaps,
		async ({ id, filename, bitmap }) => {
			try {
				let canvas = bitmapToCanvas(bitmap);
				canvas = applyPalette(canvas, opts.palette);
				canvas = applyGrid(canvas, opts.grid);
				const buffer = await canvasToBuffer(canvas);
				return { id, filename, buffer };
			} catch (err) {
				console.error(err);
				return pMapSkip;
			}
		},
		{ concurrency: 1 }
	);
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

async function canvasToBuffer(canvas: OffscreenCanvas): Promise<ArrayBuffer> {
	const blob = await canvas.convertToBlob({ type: 'image/png', quality: 1 });
	return await blob.arrayBuffer();
}
