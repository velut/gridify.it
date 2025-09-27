import { applyGrid } from '$lib/render/apply-grid';
import { applyPalette } from '$lib/render/apply-palette';
import { applyScale } from '$lib/render/apply-scale';
import { AppImage, RenderOpts, RenderWorkerCache, RenderWorkerInput } from '$lib/types';
import { nanoid } from '$lib/utils/nanoid';
import pMap, { pMapSkip } from 'p-map';

// Cache files with their decoded images already painted on a canvas.
let cache: RenderWorkerCache = [];

self.addEventListener('message', async (event) => {
	const port = event.ports[0]!;
	try {
		const { opts, files } = RenderWorkerInput.parse(event.data);
		await updateCache(files);
		const images = await render(opts);
		port.postMessage({ status: 'ok', data: { images } });
	} catch (err) {
		console.error(err);
		port.postMessage({ status: 'err', error: err });
	}
});

async function updateCache(files?: File[]) {
	if (!files) return;
	cache = await pMap(
		files,
		async (file) => {
			try {
				const bitmap = await self.createImageBitmap(file);
				const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
				const ctx = canvas.getContext('2d')!;
				ctx.imageSmoothingEnabled = false;
				ctx.drawImage(bitmap, 0, 0);
				return { file, canvas };
			} catch (err) {
				console.error(err);
				return pMapSkip;
			}
		},
		{ concurrency: 4 }
	);
}

async function render(opts: RenderOpts): Promise<AppImage[]> {
	return await pMap(
		cache,
		async ({ file: originalFile, canvas: originalCanvas }) => {
			try {
				// Copy original canvas.
				let canvas = new OffscreenCanvas(originalCanvas.width, originalCanvas.height);
				const ctx = canvas.getContext('2d')!;
				ctx.imageSmoothingEnabled = false;
				ctx.drawImage(originalCanvas, 0, 0);

				// Apply opts.
				canvas = applyScale(canvas, opts.scale);
				canvas = applyPalette(canvas, opts.palette);
				canvas = applyGrid(canvas, opts.grid);

				// Return image.
				const blob = await canvas.convertToBlob({ type: 'image/png', quality: 1 });
				const id = nanoid();
				const name = `${originalFile.name}_${id}.png`;
				const file = new File([blob], name, { type: 'image/png' });
				const url = URL.createObjectURL(file);
				const { width, height } = canvas;
				return { id, file, url, width, height };
			} catch (err) {
				console.error(err);
				return pMapSkip;
			}
		},
		{ concurrency: 1 }
	);
}
