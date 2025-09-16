import {
	RenderWorkerInput,
	AppBitmap,
	AppImageBuffer,
	type RenderWorkerOutputData
} from '$lib/types';
import pMap, { pMapSkip } from 'p-map';

self.addEventListener('message', async (event) => {
	const port = event.ports[0]!;
	try {
		console.time('worker-render');
		const data = await render(RenderWorkerInput.parse(event.data));
		console.timeEnd('worker-render');
		const transferBuffers = data.buffers.map(({ buffer }) => buffer);
		port.postMessage({ status: 'ok', data }, [...transferBuffers]);
	} catch (err) {
		port.postMessage({ status: 'err', error: err });
	}
});

async function render({ bitmaps, opts }: RenderWorkerInput): Promise<RenderWorkerOutputData> {
	const buffers = await bitmapsToBuffers(bitmaps);
	return { buffers };
}

async function bitmapsToBuffers(bitmaps: AppBitmap[]): Promise<AppImageBuffer[]> {
	return await pMap(
		bitmaps,
		async ({ id, filename, bitmap }) => {
			try {
				const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
				const ctx = canvas.getContext('bitmaprenderer')!;
				ctx.transferFromImageBitmap(bitmap);
				const blob = await canvas.convertToBlob({ type: 'image/png', quality: 1 });
				const buffer = await blob.arrayBuffer();
				return { id, filename, buffer };
			} catch (err) {
				console.error(err);
				return pMapSkip;
			}
		},
		{ concurrency: 4 }
	);
}
