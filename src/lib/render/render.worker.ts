import { RenderWorkerInput, RenderWorkerOutputData } from '$lib/types';
import pMap, { pMapSkip } from 'p-map';

self.addEventListener('message', async (event) => {
	const port = event.ports[0]!;
	try {
		console.time('worker-render');
		const data = await render(RenderWorkerInput.parse(event.data));
		console.timeEnd('worker-render');
		port.postMessage({ status: 'ok', data }, [...data.bitmaps]);
	} catch (err) {
		port.postMessage({ status: 'err', error: err });
	}
});

async function render({ bitmaps, opts }: RenderWorkerInput): Promise<RenderWorkerOutputData> {
	console.log(bitmaps[0]);
	console.log(`${bitmaps[0].width}x${bitmaps[0].height}`);
	console.log(opts);
	await createOutputImages(bitmaps);
	return { bitmaps: [] };
}

async function createOutputImages(bitmaps: ImageBitmap[]): Promise<AppImage[]> {
	return await pMap(
		bitmaps,
		async (bitmap) => {
			try {
				const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
				const ctx = canvas.getContext('bitmaprenderer')!;
				ctx.transferFromImageBitmap(bitmap);
				const blob = await canvas.convertToBlob({ type: 'image/png', quality: 1 });
				const file = new File([blob], 'foo.png', {
					type: 'image/png'
					// lastModified: image.file.lastModified
				});
				const url = URL.createObjectURL(file);
				return { file, url };
			} catch (err) {
				console.error(err);
				return pMapSkip;
			}
		},
		{ concurrency: 4 }
	);
}
